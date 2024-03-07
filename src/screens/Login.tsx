import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newData = {
      username,
      password,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/user-service/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      const data = await response.json();

      if (data?.httpStatusCode === 401) {
        alert(data?.message);
        return;
      }

      if (data?.httpStatusCode === 201) {
        localStorage.setItem("access_token", data?.data?.access_token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToCreateUser = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        {/* <img src={Lock} alt="lock icon" /> */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          Sign in
        </button>
        {/* <button
          type="button"
          className="register-button"
          onClick={navigateToCreateUser}
        >
          Sign Up
        </button> */}
      </form>
      <Link to="/register" style={{ textAlign: "right", color: "blue" }}>
        Don't have an account? Sign Up
      </Link>
    </div>
  );
};
export default Login;
