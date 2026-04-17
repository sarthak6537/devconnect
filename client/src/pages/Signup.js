import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/user/signup`, form);

      console.log("SIGNUP RESPONSE:", res.data);

      alert("Signup Success 🚀");

      navigate("/login");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Signup Failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <input
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Role"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;