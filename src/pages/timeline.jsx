import "../assets/styles/timeline.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import AccuracyChart from "../components/accuracyChart";
import LineChart from "../components/LineChart";
import useGetTimeline from "../custom-hook/useGetTimeline";

export const Timeline = () => {
  const [user] = useAuthState(auth);
  const { timeline } = useGetTimeline(user?.uid);

  return (
    <div className="timeline-container">
      {/* Profile Section */}
      <ProfileSection
        dp={user?.photoURL}
        username={user?.displayName}
        email={user?.email}
      />

      {/* Speed and accuracy data section */}
      {timeline && user && <DataSection timeline={timeline} />}
      <HistoryData timeline={timeline} />
    </div>
  );
};

const ProfileSection = (props) => {
  return (
    <div className="profile">
      <img src={props.dp} alt="display profile" />
      <div className="user-details">
        <h2>{props.username}</h2>
        <h4>{props.email}</h4>
      </div>
    </div>
  );
};

const DataSection = (props) => {
  const [type, setType] = useState("SPEED");
  // console.log(props.timeline)
  const typeToggle = () => {
    if (type === "SPEED") setType("ACCURACY");
    else setType("SPEED");
  };

  return (
    <div className="data_section">
      <button onClick={typeToggle}>{type}</button>
      <div className="data">
        <LineChart timeline={props.timeline} />
        <AccuracyChart timeline={props.timeline} />
      </div>
    </div>
  );
};

const HistoryData = (props) => {
  const timelineData = props.timeline.sort(
    (a, b) =>
      new Date(
        `${a.date.split("-")[1]}-${a.date.split("-")[0]}-${
          a.date.split("-")[2]
        }`
      ) -
      new Date(
        `${b.date.split("-")[1]}-${b.date.split("-")[0]}-${
          b.date.split("-")[2]
        }`
      )
  );

  const days = Array.from(
    new Set(timelineData.map(({ date }) => date.split("-")[0]))
  );
  const months = Array.from(
    new Set(timelineData.map(({ date }) => date.split("-")[1]))
  );
  const years = Array.from(
    new Set(timelineData.map(({ date }) => date.split("-")[2]))
  );

  const [userDate, setUserDate] = useState({
    day: days[0],
    month: months[0],
    year: years[0],
  });

  console.log(userDate);
  // console.log(days, months, years);

  return (
    <div className="history-data">
      <h3>HISTORY</h3>
      <div className="date-selectors">
        <label for="day">Day</label>
        <select
          id="day"
          name="day"
          onChange={(e) => {
            setUserDate({ ...userDate, day: e.target.value });
          }}
        >
          <option value={null} defaultChecked={true}>
            --select day--
          </option>
          {days.map((e) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
        <label for="month">Month</label>
        <select
          id="month"
          name="month"
          onChange={(e) => setUserDate({ ...userDate, month: e.target.value })}
        >
          <option value={null} defaultChecked={true}>
            --select month--
          </option>
          {months.map((e) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
        <label for="year">Year</label>
        <select
          id="year"
          name="year"
          onChange={(e) => setUserDate({ ...userDate, year: e.target.value })}
        >
          <option value={null} defaultChecked={true}>
            --select year--
          </option>
          {years.map((e) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <div className="data-section">
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Speed</td>
              <td>Accuracy</td>
            </tr>
          </thead>
          <tbody>
            {timelineData
              .filter(
                (e) =>
                  e.date ===
                  `${userDate.day}-${userDate.month}-${userDate.year}`
              )
              .map((e) => (
                <tr>
                  <td>{e.date}</td>
                  <td>{e.speed}</td>
                  <td>{e.accuracy}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
