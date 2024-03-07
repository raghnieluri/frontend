import React, { useEffect, useState } from "react";
import "../styles/users.css";
import { useNavigate } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const server_url = process.env.REACT_APP_SERVER_URL;
console.log(server_url);

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();

  async function getUserData() {
    try {
      const response = await fetch("http://localhost:5001/user-service/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

  const deleteUser = async (userId: any) => {
    try {
      const response = await fetch(
        `http://localhost:5001/user-service/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.httpStatusCode === 200) {
        alert(data?.message);
        getUserData();
      } else {
        console.error("Failed to delete user:", data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div>
      <div className="users_header">
        <h2>User Management Services</h2>
        <button className="logout_btn" onClick={logoutHandler}>
          Logout
          <MdLogout />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Action</th>
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
                <td className="action_column">
                  <span
                    onClick={() => {
                      navigate(`/edit/user/${user.id}`, {
                        state: {
                          name: user.name,
                          username: user.username,
                          email: user.email,
                        },
                      });
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <BiSolidEdit size={20} />
                  </span>
                  <span
                    onClick={() => deleteUser(user.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <MdDelete size={25} />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Users;
