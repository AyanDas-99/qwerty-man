import React from "react";
import { useEffect, useState } from "react";

const LoginError = ({ pageName, setShowle }) => {
  const [timer, setTimer] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((initial) => {
        if (initial === 1) {
          clearInterval(interval);
          setShowle({ status: false, pageName: "" });
        }
        return initial - 1;
      });
    }, 1000);
  }, []);

  return (
    <p
      style={{
        color: "white",
        fontWeight: 600,
        backgroundColor: "rgba(255, 0, 0, 0.359)",
        margin: "10px",
        borderRadius: "5px",
        position: "absolute",
        top: "0",
        width: "100%",
        padding: "2em",
      }}
    >
      Please Sign In to access {pageName}{" "}
      <span
        style={{ border: "1px solid white", padding: "5px", margin: "0 2em" }}
      >
        {timer}
      </span>
    </p>
  );
};

export default LoginError;
