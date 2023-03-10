import arrow from "../assets/images/arrow.png";
import retryImgWhite from "../assets/images/retry-white.png";
import "../assets/styles/home.css";
import useAPI from "../custom-hook/useSentence";
import { useEffect, useState } from "react";
import { Info, Output } from "./output";
import { Loader } from "../components/Loader";

export const Home = () => {
  const { data, error, isLoading, refetch } = useAPI();
  const [totalWords, setTotalWords] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [wrongWords, setWrongWords] = useState(0);
  const [text, setText] = useState([]);
  const [time, setTime] = useState(60);
  const [seconds, setSeconds] = useState(time);
  const [testFinished, setTestFinished] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  // Timer Function
  const runTimer = () => {
    const timer = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds === 1) {
          clearInterval(timer);
          setTestFinished(true);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
  };

  const scrollDown = () => {
    if (!testFinished) {
      const testSection = document.querySelector(".test-section");
      testSection.scrollIntoView({ behavior: "smooth" });
    } else {
      const outputSection = document.querySelector(".output-container");
      outputSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(scrollDown, 1500)
  }, []);

  useEffect(() => {
    setText([...String(data)].filter((e) => e !== "\n"));
  }, [data]);

  useEffect(() => {
    if (hasRun) runTimer();
  }, [hasRun]);

  useEffect(() => {
    setSeconds(time);
  }, [time]);

  const typed = (e) => {
    // set hasRun true to know when to start timer
    setHasRun(true);
    // spans array
    const letters = Array.from(document.getElementsByClassName("letter"));

    // removing previous white color
    letters.map((e) => e.classList.remove("highLight", "wrongLetter"));

    // Checking if correct
    for (let i = 0; i < e.target.value.length; i++) {
      if (e.target.value.charAt(i) === letters[i].textContent) {
        letters[i].classList.add("highLight");
      } else {
        letters[i].classList.add("wrongLetter");
      }

      if (letters[i].textContent === " ") {
        setTotalWords(totalWords + 1);
        if (text.slice(0, e.target.value.length).join("") === e.target.value)
          setCorrectWords(correctWords + 1);
        else setWrongWords(wrongWords + 1);
        setText(text.splice(e.target.value.length));
        e.target.value = "";
        letters.map((e) => e.classList.remove("highLight", "wrongLetter"));
      }
    }
  };

  return (
    <>
      <div className="hero-section">
        <h1>QWERTY-MAN</h1>
        <p>The All-round Typing Practice Site.</p>
        <div className="arrow">
          <img src={arrow} alt="arrow" onClick={scrollDown} />
        </div>
      </div>

      {!testFinished ? (
        <div className="test-section" id="test-section">
          {/* TImer section */}
          <div className="timer-section">
            <Info type={"Timer"} data={seconds} extension={"s"} />
            {!hasRun && (
              <div className="timer-options">
                <button className="option-item" onClick={() => setTime(15)}>
                  15s
                </button>
                <button className="option-item" onClick={() => setTime(30)}>
                  30s
                </button>
                <button className="option-item" onClick={() => setTime(60)}>
                  60s
                </button>
              </div>
            )}
          </div>

          <div className="sentence">
            {isLoading ? <Loader /> : <Words sentence={text} />}
            {error && (
              <p style={{ color: "red" }}>
                There is an error loading the sentence
              </p>
            )}
          </div>

          <div className="write">
            <input
              type={"text"}
              onChange={(e) => typed(e)}
              id="input-text"
              autoComplete="off"
              autoFocus="on"
            />
          </div>

          <div className="RetryBtn" onClick={() => window.navigation.reload()}>
            <img src={retryImgWhite} alt="retry btn" id="retryImg" />
          </div>
        </div>
      ) : (
        <Output
          correctWords={correctWords}
          totalWords={totalWords}
          time={time}
          wrongWords={wrongWords}
        />
      )}
    </>
  );
};

const Words = (props) => {
  const data = props.sentence;
  return (
    <p>
      {data.map((e, key) => (
        <span key={key} className="letter">
          {e}
        </span>
      ))}
    </p>
  );
};
