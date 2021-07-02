import React, { useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ userName: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          userName: formState.userName,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <section>
        <form onSubmit={handleFormSubmit}>
          <div id="formContainer">
            <h1 id="loginHeader">Login</h1>

            <input
              name="userName"
              type="userName"
              id="userName"
              onChange={handleChange}
              placeholder=" Username"
            />

            <input
              placeholder=" Password"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />

            {error ? (
              <div>
                <p className="error-text">
                  The provided credentials are incorrect
                </p>
              </div>
            ) : null}

            {/* <Link to="/Dashboard" exact className="navItem" id="login-btn">
              Login
            </Link> */}
            <button type="submit" className="navItem" id="login-btn">
              Login
            </button>
          </div>
        </form>

        <Link to="/Signup" exact className="navItem" id="signup-btn">
          Sign Up
        </Link>
      </section>
    </>
  );
}

export default Login;
