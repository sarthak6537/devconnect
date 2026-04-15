import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api";

function MyApplications() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const userId = localStorage.getItem("userId");

    const res = await axios.get(
      `${BASE_URL}/application/my/${userId}`
    );

    setApps(res.data);
  };

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    await axios.put(
      `${BASE_URL}/application/update/${id}`,
      { status }
    );
    alert("Updated");
    fetchApps();
  };

  return (
    <div>
      <h2>My Applications</h2>

      {apps.length === 0 && <p>No applications found</p>}

      {apps.map((a) => (
        <div
          key={a._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>Project ID: {a.projectId}</p>
          <p>{a.message}</p>
          <p>Status: {a.status}</p>

          <button onClick={() => updateStatus(a._id, "accepted")}>
            Accept
          </button>

          <button onClick={() => updateStatus(a._id, "rejected")}>
            Reject
          </button>

          {/* ✅ FIXED CHAT BUTTON */}
          <button onClick={() => navigate(`/chat/${a.projectId}`)}>
            Open Chat
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;