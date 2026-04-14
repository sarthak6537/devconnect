import { useState } from "react";
import axios from "axios";

function Signup() {
  const [data, setData] = useState({});

  const handleSubmit = async () => {
    await axios.post("http://https://devconnect-twnc.onrender.com//user/signup", data);
    alert("User Registered 🚀");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <input className="w-full border p-2 mb-2 rounded"
          placeholder="Name"
          onChange={e => setData({ ...data, name: e.target.value })}
        />

        <input className="w-full border p-2 mb-2 rounded"
          placeholder="Email"
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <input className="w-full border p-2 mb-2 rounded"
          placeholder="Password"
          type="password"
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        <input className="w-full border p-2 mb-4 rounded"
          placeholder="Role (shopkeeper/developer)"
          onChange={e => setData({ ...data, role: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;