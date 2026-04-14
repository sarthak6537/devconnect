import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get("http://https://devconnect-twnc.onrender.com//project/all");
    setProjects(res.data);
  };

  // ✅ APPLY FUNCTION (UPDATED WITH TOKEN)
  const apply = async (projectId) => {
    try {
      const developerId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      await axios.post(
        "http://https://devconnect-twnc.onrender.com//application/apply",
        {
          projectId,
          developerId,
          message: "I can build this project"
        },
        {
          headers: {
            Authorization: token // ✅ VERY IMPORTANT
          }
        }
      );

      alert("Applied Successfully");
    } catch (err) {
      alert("Error: " + err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
  <h2 className="text-3xl font-bold text-center mb-8">
    🔥 Available Projects
  </h2>

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
      </div>
    ))}
  </div>
</div>
  );
}

export default Projects;