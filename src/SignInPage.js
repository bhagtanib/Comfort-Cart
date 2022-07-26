import React, { useEffect, useState } from "react";
import "./Login.css";

import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase.js";
import { useStateValue } from "./Stateprovider";
import { setDoc,doc,collection } from "firebase/firestore";


import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const SignInPage = () => {
  const [{ loggedInUser }, dispatch] = useStateValue();

  // login code
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  let navigate = useNavigate(); // to navigate between pages

  // to change logged in user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  //  Sign in function defination
  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch({
        type: "LOG_IN_USER",
        newUser: user,
      });
      console.log(user);

      navigate("/");
    } catch (err) {
      alert(err.message);
      console.warn(err.message);
    }
  };

  //  Sign up function defination

  const register = async () => {
    try {
      let user = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({
        type: "LOG_IN_USER",
        newUser: user,
      });


      //register user into database

      await setDoc(doc(db, "users", user.user.uid), {
        email: email,
        UID: user.user.uid,
      });
      navigate("/"); //navigate back to main page
    } catch (err) {
      alert(err.message);
      console.warn(err.message);
    }
  };

// render the actual signIn page

  return (
    <div>
      <div className="login-bottom">
        <h2> Sign-In </h2>
        <form className="login-bottom-form">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          ></input>
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          ></input>

          <button type="button" className="login-page-buttons" onClick={signIn}>
            Sign In
          </button>
        </form>
        <br></br>
        <h4>OR</h4>

        <button type="button" className="login-page-buttons" onClick={register}>
          Sign up
        </button>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default SignInPage;
