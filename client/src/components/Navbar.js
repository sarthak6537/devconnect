import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">DevConnect</h1>

      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/projects" className="hover:text-blue-400">Projects</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;