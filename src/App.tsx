import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Users from "./screens/Users";
import Login from "./screens/Login";
import IndividualUserDetail from "./screens/IndividualUserDetail";
import { useEffect, useState } from "react";
import EditUser from "./screens/EditUser";
import { DeleteUser } from "./screens/DeleteUser";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("access_token") ?? ""
  );

  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);

    if (token === undefined || token.length === 0) {
      console.log("first");
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/user/:userId" element={<IndividualUserDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/edit/user/:userId" element={<EditUser />} />
      <Route path="/delete/user/:userId" element={<DeleteUser />} />
    </Routes>
  );
}

export default App;
