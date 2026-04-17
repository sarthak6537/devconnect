import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function PostProject() {
  const [project, setProject] = useState({
    title: "",
    budget: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      if (!project.title || !project.budget) {
        alert("Please fill all fields");
        return;
      }

      const res = await axios.post(`${BASE_URL}/project/create`, project);

      console.log(res.data);
      alert("Project Posted Successfully");

      // ✅ clear form
      setProject({
        title: "",
        budget: "",
        description: "",
      });

    } catch (err) {
      console.log(err);
      alert("Error posting project");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Post Project</h2>

      <input
        placeholder="Title"
        value={project.title}
        onChange={(e) =>
          setProject({ ...project, title: e.target.value })
        }
        className="border p-2 mb-2 w-full"
      />

      <input
        placeholder="Budget"
        value={project.budget}
        onChange={(e) =>
          setProject({ ...project, budget: e.target.value })
        }
        className="border p-2 mb-2 w-full"
      />

      <textarea
        placeholder="Description"
        value={project.description}
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
        className="border p-2 mb-2 w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Post Project
      </button>
    </div>
  );
}

export default PostProject;