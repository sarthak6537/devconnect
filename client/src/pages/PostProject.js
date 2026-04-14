import { useState } from "react";
import axios from "axios";

function PostProject() {
  const [project, setProject] = useState({});

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/project/create", project);
    alert("Project Posted");
  };

  return (
    <div>
      <h2>Post Project</h2>
      <input placeholder="Title" onChange={e => setProject({ ...project, title: e.target.value })} />
      <br />
      <input placeholder="Budget" onChange={e => setProject({ ...project, budget: e.target.value })} />
      <br />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}

export default PostProject;