import { signInWithRedirect, signOut } from "firebase/auth";
import { collectionGroup } from "firebase/firestore";
import { auth, provider } from "../config/firebase";

export const Login = (props) => {
  // Google signin function
  const GSignIn = async () => {
    console.log("Redirecting..")
    await signInWithRedirect(auth, provider);
  };

  // sign out funtion
  const GSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="login-container no">
      <div className="username no">
        <div className="profile-pic no">
          <img src={props.dp} alt="profile" className="no" />
        </div>
        <p className="no">{props.userName}</p>
      </div>
      <div className="actions no">
        <div className="log blue no" onClick={GSignIn}>
          Switch Account
        </div>
        <div className="log red no" onClick={GSignOut}>
          Logout
        </div>
      </div>
    </div>
  );
};
