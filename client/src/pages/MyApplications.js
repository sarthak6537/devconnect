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
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.get(
        `${BASE_URL}/application/my/${userId}`
      );

      setApps(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading applications");
    }
  };

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/application/update/${id}`,
        { status }
      );
      alert("Updated");
      fetchApps();
    } catch (err) {
      alert("Error updating status");
    }
  };

  // ✅ SAFE CHAT NAVIGATION
  const openChat = (projectId) => {
    const id =
      typeof projectId === "object" ? projectId._id : projectId;

    console.log("Navigating to chat with ID:", id);

    if (!id) {
      alert("Project ID not found");
      return;
    }

    navigate(`/chat/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>

      {apps.length === 0 && (
        <p className="text-gray-500">No applications found</p>
      )}

      {apps.map((a) => (
        <div
          key={a._id}
          className="bg-white p-4 mb-4 rounded shadow"
        >
          {/* ✅ SHOW PROPER PROJECT INFO */}
          <p className="font-semibold">
            Project:{" "}
            {typeof a.projectId === "object"
              ? a.projectId.title
              : a.projectId}
          </p>

          <p className="text-gray-600">{a.message}</p>

          <p className="mt-1">
            Status:{" "}
            <span className="font-bold">{a.status}</span>
          </p>

          {/* BUTTONS */}
          <div className="mt-3 space-x-2">
            <button
              onClick={() => updateStatus(a._id, "accepted")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Accept
            </button>

            <button
              onClick={() => updateStatus(a._id, "rejected")}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Reject
            </button>

            {/* ✅ CHAT BUTTON */}
            <button
              onClick={() => openChat(a.projectId)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Open Chat
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;