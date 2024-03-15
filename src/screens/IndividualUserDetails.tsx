import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/individualUserDetails.css";

const IndividualUserDetails = () => {
  const [userDetails, setUserDetails] = useState<any>({});
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/user-service/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.status === 401) {
          navigate("/login");
        } else {
          setUserDetails(data);
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, [userId, navigate, token]);

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <div className="details">
        <p>
          <b>ID:</b> {userDetails.id}
        </p>
        <p>
          <b>Name:</b> {userDetails.name}
        </p>
        <p>
          <b>Email:</b> {userDetails.email}
        </p>
        <p>
          <b>Username:</b> {userDetails.username}
        </p>
      </div>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default IndividualUserDetails;
