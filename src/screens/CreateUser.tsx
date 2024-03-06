import { BaseSyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [userDetails, setuserDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    event.preventDefault();

    const newUser = {
      name,
      email,
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/user-service/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data?.httpStatusCode === 401) {
        alert(data?.message);
        return;
      }

      if (data?.httpStatusCode === 201) {
        //popup message
        navigate("/login");
      }
    } catch (error) {}
  };

  return (
    <>
      <form className="user-edit-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <button type="submit">Register</button>
        <Link style={{ textAlign: "right", color: "blue" }} to="/login">
          Already have an account? Sign in
        </Link>
      </form>
    </>
  );
};

export default CreateUser;
