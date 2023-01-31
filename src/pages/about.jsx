import profilePic from "../assets/images/grey-background-white-border.png";
import reactLogo from "../assets/images/logo512.png";
import firebaseLogo from "../assets/images/firebase.png";
import op1 from "../assets/images/graph1.png";
import op2 from "../assets/images/graph2.png";
import "../assets/styles/about.css";
import { useEffect } from "react";

export const About = () => {
  // Scroll to top
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="about-container">
      <div className="content">
        <h1>Why Us?</h1>
        <section className="section1">
          <p>
            At QWERTY-MAN, we understand the importance of accurate and
            efficient typing skills in today's fast-paced digital world. That's
            why we have dedicated ourselves to creating the most user-friendly
            and comprehensive typing test website on the internet.
          </p>
          <p>
            Our typing test platform is designed to be easy to use, with
            intuitive navigation and a sleek, modern design. We offer a wide
            variety of typing tests, including tests for specific industries and
            languages, so you can find the perfect test to meet your needs.
          </p>
          <p>
            In addition to our wide variety of typing tests, we also offer
            detailed analysis and reports of your typing performance, so you can
            track your progress and identify areas where you need to improve.
          </p>
          <div className="graphs-demo">
            <img src={op1} alt="graph1" />
            <img src={op2} alt="graph2" />
          </div>
          <p>
            We are constantly updating and improving our website to ensure the
            best user experience. Our team is dedicated to providing the highest
            level of customer service and support.
          </p>
          <p>
            At QWERTY-MAN, we believe that the key to success is practice and
            improvement. Our typing tests provide the perfect opportunity to
            hone your skills and take your typing to the next level. Try us out
            today and see the difference for yourself!"
          </p>
        </section>

        <h1>Tech Used</h1>
        <section className="section2">
          <div className="flex">
            <div className="how-part">
              <h2>Techstack used is ReactJs and Firebase</h2>
              <div className="techstack flex">
                <div className="react-stack small">
                  <img src={reactLogo} alt="react logo" />
                  <h4>React Concepts Used</h4>
                  <ul>
                    <a
                      href="https://beta.reactjs.org/reference/react/useState"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <li>useState</li>
                    </a>
                    <a
                      href="https://reactjs.org/docs/hooks-effect.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <li>useEffect</li>
                    </a>
                    <a
                      href="https://reactrouter.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <li>react-router-dom</li>
                    </a>
                    <a
                      href="https://beta.reactjs.org/reference/react/useReducer"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <li>useReducer</li>
                    </a>
                  </ul>
                </div>
                <div className="firebase-stack small">
                  <img src={firebaseLogo} alt="firebase logo" />
                  <h4>Firebase Concepts used</h4>
                  <ul>
                    <a
                      href="https://firebase.google.com/docs/auth"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <li>Authentication</li>
                    </a>
                    <a
                      href="https://firebase.google.com/docs/database"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <li>Realtime Databases</li>
                    </a>
                    <a
                      href="https://www.npmjs.com/package/react-firebase-hooks"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <li>react-firebase-hooks</li>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
            <div className="who-part">
              <div className="dp">
                <img src={profilePic} alt="Ayan Das" />
                <h3>Ayan Das</h3>
              </div>
              <section className="comment">
                "This website holds a special place in my heart, I always wanted
                to be able to build something like this for so long, and now
                that I am able, I want to share it with you guys. Please let me
                know how you feel about this website. Thankyou all."
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
