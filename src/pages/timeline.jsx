import "../assets/styles/timeline.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useState } from "react";
import AccuracyChart from "../components/accuracyChart";
import LineChart from "../components/LineChart";
import useGetTimeline from "../custom-hook/useGetTimeline";
import { useReducer } from "react";
import { useEffect } from "react";
import calenderPic from "../assets/images/calender.svg";
import toggleIcon from "../assets/images/change.svg";

export const Timeline = () => {
  const [user] = useAuthState(auth);
  const { timeline } = useGetTimeline(user?.uid);

  useEffect(() => window.scrollTo(0, 0), []);

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
      <div className="toggle">
        <button onClick={typeToggle}>
          {type} <img src={toggleIcon} alt="change type" />
        </button>
      </div>
      <div className="data">
        {type === "SPEED" ? (
          <LineChart timeline={props.timeline} />
        ) : (
          <AccuracyChart timeline={props.timeline} />
        )}
      </div>
    </div>
  );
};

// ************** HISTORY DATA COMPONENT

const HistoryData = (props) => {
  // Timeline data sorted by date
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

  // days, months and years avaiblabe in data
  const availableDates = {
    days: Array.from(
      new Set(timelineData.map(({ date }) => date.split("-")[0]))
    ),
    months: Array.from(
      new Set(timelineData.map(({ date }) => date.split("-")[1]))
    ),
    years: Array.from(
      new Set(timelineData.map(({ date }) => date.split("-")[2]))
    ),
  };

  // user input for history date (Initial value)
  const initialState = {
    day: availableDates.days[0],
    month: availableDates.months[0],
    year: availableDates.years[0],
    isValid: false,
  };

  // user input reducer funtion
  const reducer = (state, { type, payload }) => {
    const validTypes = ["day", "month", "year"];
    let newState;
    if (validTypes.includes(type)) {
      newState = { ...state, [type]: payload };
    } else throw new Error(`Unknown type: ${type}`);

    if (
      !isNaN(newState.day) &&
      !isNaN(newState.month) &&
      !isNaN(newState.year)
    ) {
      newState = { ...newState, isValid: true };
      console.log("true..");
    } else newState = { ...newState, isValid: false };
    console.log(
      !isNaN(newState.day),
      !isNaN(newState.month),
      !isNaN(newState.year)
    );

    console.log(newState);
    return newState;
  };

  // state for user input
  const [userDate, dispatch] = useReducer(reducer, initialState);

  // console.log(userDate);
  // console.log(days, months, years);

  return (
    <div className="history-data">
      <h3>HISTORY</h3>
      <div className="date-selectors">
        {/* Day selection */}
        <label htmlFor="day">Day</label>
        <select
          id="day"
          name="day"
          onChange={(e) => dispatch({ type: "day", payload: e.target.value })}
        >
          <option value={null} defaultChecked={true}>
            --select day--
          </option>
          {availableDates.days.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
          ))}
        </select>

        {/* Month selecton */}
        <label htmlfor="month">Month</label>
        <select
          id="month"
          name="month"
          onChange={(e) => dispatch({ type: "month", payload: e.target.value })}
        >
          <option value={null} defaultChecked={true}>
            --select month--
          </option>
          {availableDates.months.map((e) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>

        {/* year selection */}
        <label htmlfor="year">Year</label>
        <select
          id="year"
          name="year"
          onChange={(e) => dispatch({ type: "year", payload: e.target.value })}
        >
          <option value={null} defaultChecked={true}>
            --select year--
          </option>
          {availableDates.years.map((e) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      {/* Data Table Section */}
      {userDate.isValid ? (
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
                    <td>{e.speed} WPM</td>
                    <td>{e.accuracy} %</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="dateNotSelected">
          <h2>Select Valid Date</h2>
          <img src={calenderPic} alt="Date not selected" />
        </div>
      )}
    </div>
  );
};
