import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
// import Lock from "../assests/padlock-icon.jpg";

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
        "http://localhost:5000/user-service/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data?.httpStatusCode === 401) {
        alert(data?.message);
        return;
      }

      if (data?.httpStatusCode === 201) {
        console.log(data?.data);
        localStorage.setItem("access_token", data?.data?.access_token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Sign in</h1>
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
          SUBMIT
        </button>
      </form>
    </div>
  );
};
export default Login;
