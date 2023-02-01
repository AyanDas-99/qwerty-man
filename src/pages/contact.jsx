import React, { useEffect, useState } from "react";
import "../assets/styles/contact.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import loader from "../assets/images/loader.gif";
import { useNavigate } from "react-router-dom";
import LoginError from "../components/LoginError";

const Contact = () => {
  const [user] = useAuthState(auth);

  const [showError, setShowError] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [msgSending, setMsgSending] = useState(false);
  const [showle, setShowle] = useState({ status: false, pageName: "" });

  // connecting to db
  const postRef = collection(db, "messages");

  const onSubmit = (data) => {
    setMsgSending(true);
    const uploadMessage = async (data) => {
      try {
        await addDoc(postRef, {
          fullname: data.fullName,
          message: data.message,
          email: user.email,
          userId: user.uid,
        });
        console.log("uploading message to db...");
        setMsgSending(false);
        setMsgSent(true);
      } catch (e) {
        console.error(e);
      }
    };

    uploadMessage(data);
  };

  const schema = yup.object().shape({
    fullName: yup.string().required("Please enter your full name"),
    message: yup.string().required("Please enter your message"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (errors) setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 4000);
  }, [errors]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (!msgSent) {
    return (
      <div className="contact-container">
        {showle.status && (
          <LoginError pageName={showle.pageName} setShowle={setShowle} />
        )}
        <div className="cover">
          <h2>What's in your mind?</h2>
          <h2>I'd love to hear your thoughts</h2>
        </div>
        <div className="contact-form">
          <h2
            className="mobileHeading"
            style={{ margin: "1em 0", color: "white" }}
          >
            Share your thoughts
          </h2>
          {showError && (
            <div className="errorDiv">
              {errors.fullName && (
                <ErrorBlock
                  message={errors.fullName.message}
                  setShowError={setShowError}
                />
              )}
              {errors.message && (
                <ErrorBlock message={errors.message.message} />
              )}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="userInput"
              type={"text"}
              placeholder="Full Name"
              {...register("fullName")}
            />

            <textarea
              className="userInput"
              placeholder="Message"
              cols={50}
              rows={20}
              {...register("message")}
            />
            <div className="formBtns">
              <button className="red" type="reset">
                Reset
              </button>
              {!msgSending ? (
                <button
                  className="blue"
                  type="submit"
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      setShowle({ status: true, pageName: "Talk to us" });
                    }
                  }}
                >
                  Send{" "}
                </button>
              ) : (
                <button className="loadingBtn blue">
                  <img src={loader} alt="loader" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <Confirmed />;
  }
};

export default Contact;

const ErrorBlock = (prop) => {
  return (
    <p className="errorMessage">
      {prop.message} <span>{prop.timer}</span>
    </p>
  );
};

const Confirmed = () => {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevRemainingTime) => {
        if (prevRemainingTime === 0) {
          clearInterval(intervalId);
          return prevRemainingTime;
        }
        return prevRemainingTime - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (remainingTime === 0) {
    navigate("/");
  }

  return (
    <div className="confirmation">
      Thank you for contacting us <br />
      Redirecting to home page in {remainingTime}s
    </div>
  );
};
