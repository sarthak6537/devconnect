import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/project/all`);
      setProjects(res.data);
    } catch (err) {
      alert("Error loading projects");
    }
  };

  // ✅ APPLY FUNCTION
  const apply = async (projectId) => {
    try {
      const developerId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      await axios.post(
        `${BASE_URL}/application/apply`,
        {
          projectId,
          developerId,
          message: "I can build this project",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Applied Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error applying");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        🔥 Available Projects
      </h2>

      {/* ✅ EMPTY STATE */}
      {projects.length === 0 && (
        <p className="text-center text-gray-500">
          No projects available
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="text-gray-600 mt-2">₹ {p.budget}</p>

            <button
              onClick={() => apply(p._id)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Apply
            </button>
            <button onClick={() => navigate(`/chat/${p._id}`)}>
  Open Chat
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;