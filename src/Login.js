import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { auth} from "./firebase.js";
// import { useStateValue } from "./Stateprovider";

import {
  onAuthStateChanged
} from "firebase/auth";
import SignInPage from "./SignInPage";
import SingOutPage from "./SingOutPage";
// import { addDoc, collection } from "firebase/firestore";

const Login = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  
  // login code ends
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-top">
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9WbQ37VRS-FQHEDS0jOMISIAbrCFnqvo1Owig2avmtHSXC8eIdQbajD370hpFjdRZ66w&usqp=CAU"
              alt="#"
            ></img>
          </Link>
        </div>
        {/* Sign In */}
        {user? <SingOutPage /> :<SignInPage /> }
      </div>
    </div>
  );
};

export default Login;
