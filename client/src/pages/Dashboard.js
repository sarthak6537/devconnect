import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function Dashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const userId = localStorage.getItem("userId");
    const res = await axios.get(`${BASE_URL}/application/my/${userId}`);
    setApps(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          Total Applications: {apps.length}
        </div>

        <div className="bg-green-500 text-white p-4 rounded-lg">
          Accepted: {apps.filter(a => a.status === "accepted").length}
        </div>

        <div className="bg-red-500 text-white p-4 rounded-lg">
          Rejected: {apps.filter(a => a.status === "rejected").length}
        </div>
      </div>

      <h3 className="text-xl mb-2">My Applications</h3>

      {apps.map((a) => (
        <div key={a._id} className="bg-white p-3 mb-2 shadow rounded">
          <p>{a.message}</p>
          <p>Status: {a.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;