import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Users from "./screens/Users";
import Login from "./screens/Login";
import { useEffect, useState } from "react";
import EditUser from "./screens/EditUser";
import { DeleteUser } from "./screens/DeleteUser";
import CreateUser from "./screens/CreateUser";
import IndividualUserDetails from "./screens/IndividualUserDetails";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("access_token") ?? ""
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (token === undefined || token.length === 0) {
      console.log("first");
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<CreateUser />} />
      <Route path="/user/:userId" element={<IndividualUserDetails />} />
      <Route path="/edit/user/:userId" element={<EditUser />} />
      <Route path="/delete/user/:userId" element={<DeleteUser />} />
    </Routes>
  );
}

export default App;
