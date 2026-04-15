import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostProject from "./pages/PostProject";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";
import MyApplications from "./pages/MyApplications";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<PostProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/my-apps" element={<MyApplications />} />
      </Routes>
    </HashRouter>
  );
}

export default App;