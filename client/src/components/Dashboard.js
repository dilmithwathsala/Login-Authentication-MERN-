import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/protected", {
        headers: { Authorization: token },
      })
      .then((res) => setData(res.data.msg))
      .catch((err) => setData(err.response?.data?.msg || "Access denied"));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Dashboard</h2>
        <p>{data}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
