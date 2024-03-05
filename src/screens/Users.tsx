import React, { useEffect, useState } from "react";
import "../styles/users.css";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [name, setName] = useState("");
  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();

  async function getUserData() {
    try {
      const response = await fetch("http://localhost:5000/user-service/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.statusCode === 401) {
        navigate("/login");
      }
      setUsersData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  console.log(usersData);
  return (
    <div>
      <h2>HTML Table</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>username</th>
          </tr>
        </thead>
        <tbody>
          {usersData?.length > 0 &&
            usersData?.map((user: any) => (
              <tr key={user.id}>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/user/${user.id}`);
                  }}
                >
                  {user.id}
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
