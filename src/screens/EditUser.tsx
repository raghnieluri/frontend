import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../styles/editUsers.css";

interface UserUpdate {
  name: string;
  email: string;
  username: string;
}

const EditUser = () => {
  const location = useLocation();
  const state = location.state;

  const [user, setUser] = useState<UserUpdate>({
    name: state.name,
    email: state.email,
    username: state.username,
  });

  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  useEffect(() => {}, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://localhost:5001/user-service/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (data.statusCode === 400) {
        alert(data.error);
        return;
      }
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-edit-form">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Update Details</button>
    </form>
  );
};

export default EditUser;
