import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await API.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">

      {/* 🔥 Glass Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Login to your Project Tracker
        </p>

        <div className="flex flex-col gap-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            className="bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Password"
            className="bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 transition transform text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            Login 🚀
          </button>

        </div>

      </div>
    </div>
  );
}