import "../assets/styles/output.css";
import retryBtn from "../assets/images/retry.png";
import { useAuthState } from "react-firebase-hooks/auth";

// Firestore imports for db
import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";

// Chart Import
import LineChart from "../components/LineChart";
import useGetTimeline from "../custom-hook/useGetTimeline";
import AccuracyChart from "../components/accuracyChart";

export const Output = (props) => {
  const netSpeed = Number(props.correctWords) / (Number(props.time) / 60);
  const grossSpeed = props.totalWords / (props.time / 60);
  const accuracy = (netSpeed * 100) / grossSpeed;

  // formated data for chart

  // Loged in user
  const [user] = useAuthState(auth);

  const reload = () => {
    window.navigation.reload();
  };

  // Document reference
  const postRef = collection(db, "timeline-data");
  const { timeline } = useGetTimeline(user?.uid);

  // Upload the result in firestore
  useEffect(() => {
    // Upload funtion
    const uploadToDb = async (data) => {
      const now = new Date();
      try {
        await addDoc(postRef, {
          speed: data.netSpeed,
          userId: user?.uid,
          accuracy: data.accuracy.toFixed(2),
          date: `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`,
        });
        console.log("speed data uploading to bd..");
      } catch (e) {
        console.error(e);
      }
    };

    uploadToDb({ netSpeed, accuracy });
  }, []);

  return (
    <div className="output-container">
      <div className="flex-div">
        {/* Main result */}
        <div className="main-data">
          {/* Main Speed */}
          <div className="speed-div effect">
            <p className="speed">{netSpeed}</p>
            <p>WPM</p>
          </div>

          {/*  Additional Data*/}
          <div className="additional">
            <Info type="Accuracy" data={accuracy.toFixed(2)} extension="%" />
            <Info type={"Raw Speed"} data={grossSpeed} extension={"WPM"} />
            <Info
              type={"Correct Words"}
              data={props.correctWords}
              extension={""}
            />
            <Info type={"Wrong Words"} data={props.wrongWords} extension={""} />
          </div>
        </div>

        {/* Chart */}
        {timeline && user && (
          <div className="charts">
            <LineChart timeline={timeline} />
            <AccuracyChart timeline={timeline} />
          </div>
        )}
      </div>

      {/* Retry Button */}
      <div className="controls">
        <button className="retryBtn" onClick={() => reload()}>
          New Test <img src={retryBtn} alt="retry button" />
        </button>
      </div>
    </div>
  );
};

export const Info = (props) => {
  return (
    <div className="additional-info-container">
      <div className="type">{props.type}</div>
      <div className="data">
        {props.data} {props.extension}
      </div>
    </div>
  );
};
