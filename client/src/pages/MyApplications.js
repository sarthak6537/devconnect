import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const userId = localStorage.getItem("userId");

    const res = await axios.get(`http://https://devconnect-twnc.onrender.com/application/my/${userId}`);
    setApps(res.data);
  };

  return (
    <div>
      <h2>My Applications</h2>

      {apps.map((a, i) => (
        <div key={i} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <p>Project ID: {a.projectId}</p>
          <p>{a.message}</p>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;