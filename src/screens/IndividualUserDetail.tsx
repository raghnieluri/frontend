import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/userDetails.css";
import { BiAlignLeft, BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import EditUser from "./EditUser";

interface UserDetails {
  id: number;
  name: string;
  email: string;
  username: string;
}

const IndividualUserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const navigate = useNavigate();

  async function getUserById() {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://localhost:5000/user-service/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (userId) {
      getUserById();
    }
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-card">
      <div>
        <h2>User Details</h2>
        <span
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
          }}
          onClick={() => {
            navigate(`/edit/user/${userId}`);
          }}
        >
          <BiSolidEdit size={20} />
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`/delete/user/${userId}`);
          }}
        >
          <MdDelete size={25} />
        </span>
      </div>
      <p>
        <strong>ID:</strong> {userDetails.id}
      </p>
      <p>
        <strong>Name:</strong> {userDetails.name}
      </p>
      <p>
        <strong>Email:</strong> {userDetails.email}
      </p>
      <p>
        <strong>Username:</strong> {userDetails.username}
      </p>
    </div>
  );
};

export default IndividualUserDetail;
