import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const userId = localStorage.getItem("userId");

    const res = await axios.get(
      `https://devconnect-twnc.onrender.com/application/my/${userId}`
    );

    setApps(res.data);
  };

  // ✅ NEW FUNCTION (STEP 5)
  const updateStatus = async (id, status) => {
    await axios.put(
      `https://devconnect-twnc.onrender.com/application/update/${id}`,
      { status }
    );
    alert("Updated");
    fetchApps(); // refresh list
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

          {/* ✅ NEW BUTTONS */}
          <button onClick={() => updateStatus(a._id, "accepted")}>
            Accept
          </button>

          <button onClick={() => updateStatus(a._id, "rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;