import "../assets/styles/navbar.css";
import { Link } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Login } from "./login";
import { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import menuCloseIcon from "../assets/images/menu/menu-unfold-line.svg";
import menuOpenIcon from "../assets/images/menu/menu-fold-line.svg";
import LoginError from "./LoginError";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isvisible, setIsVisible] = useState(false);
  const [showle, setShowle] = useState({ status: false, pageName: "" });
  // Sign out function
  const signin = async () => {
    await signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.target.className !== "dp" && !e.target.classList.contains("no")) {
        setIsVisible(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  });

  const [navClicked, setNavClicked] = useState(false);

  return (
    <header>
      {showle.status && (
        <LoginError pageName={showle.pageName} setShowle={setShowle} />
      )}
      <div className="nav-container">
        <Link to={"/"}>
          <div className="main-logo">QWERTY-MAN</div>
        </Link>
        <img
          className="hamMenu"
          src={menuOpenIcon}
          alt="menu open"
          onClick={() => setNavClicked(true)}
        />
        <nav className={`navbar ${navClicked && "navClicked"}`}>
          <img
            className="hamMenu"
            src={menuCloseIcon}
            alt="menu close"
            onClick={() => setNavClicked(false)}
          />
          <Link to={"/"} onClick={() => setNavClicked(false)}>
            Home
          </Link>
          <Link
            to={"/timeline"}
            onClick={(e) => {
              setNavClicked(false);
              if (!user) {
                console.log("Timeline clicked");
                e.preventDefault();
                setShowle({ status: true, pageName: "Timeline" });
              }
            }}
          >
            Timeline
          </Link>
          <Link to={"/about"} onClick={() => setNavClicked(false)}>
            About Us
          </Link>
          <Link
            to={"/contact"}
            onClick={(e) => {
              setNavClicked(false);
              if (!user) {
                e.preventDefault();
                setShowle({ status: true, pageName: "Talk to us" });
              }
            }}
          >
            Talk To Us
          </Link>
        </nav>
        {user ? (
          <div className="user">
            <div
              className="profile-pic nav-dp"
              onClick={() => setIsVisible(!isvisible)}
            >
              <img src={user.photoURL} alt="display profile" className="dp" />
            </div>
            {isvisible && (
              <Login dp={user.photoURL} userName={user.displayName} />
            )}
          </div>
        ) : (
          <button onClick={signin} className="signinBtn">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
