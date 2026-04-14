import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-blue-400">DevConnect</h1>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/projects" className="hover:text-blue-400">Projects</Link>

        {role === "shopkeeper" && (
          <Link to="/post" className="hover:text-blue-400">Post</Link>
        )}

        {role === "developer" && (
          <Link to="/my-apps" className="hover:text-blue-400">My Apps</Link>
        )}

        <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;