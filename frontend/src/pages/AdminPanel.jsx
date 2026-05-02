import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      alert("Access denied (Admin only)");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    try {
      await API.post("/api/users", form);
      setForm({ name: "", email: "", password: "", role: "member" });
      fetchUsers();
    } catch (err) {
      alert("Error creating user");
    }
  };

  const changeRole = async (id, role) => {
    try {
      await API.put(`/users/${id}/role`, { role });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
    } catch (err) {
      alert("Error updating role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">

        {/* 🔥 HEADER */}
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        {/* 🔥 CREATE USER */}
        <div className="glass p-6 rounded-xl max-w-xl glow">
          <h2 className="text-lg mb-4 text-gray-300">
            Create New User
          </h2>

          <div className="grid gap-3">

            <input
              className="bg-transparent border border-white/10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="bg-transparent border border-white/10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              className="bg-transparent border border-white/10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <select
              className="bg-transparent border border-white/10 p-2 rounded"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={createUser}
              className="bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded-lg hover:scale-105 transition"
            >
              Create User
            </button>
          </div>
        </div>

        {/* 🔥 USERS LIST */}
        <div className="glass p-6 rounded-xl glow">
          <h2 className="text-lg mb-4 text-gray-300">
            All Users
          </h2>

          {loading && (
            <p className="text-gray-400">Loading...</p>
          )}

          <div className="space-y-3">

            {users.map((u) => (
              <div
                key={u._id}
                className="glass p-4 rounded-lg flex justify-between items-center hover:scale-[1.01] transition"
              >
                {/* LEFT */}
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-gray-400">
                    {u.email}
                  </p>

                  <span
                    className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${
                      u.role === "admin"
                        ? "bg-green-400/20 text-green-300"
                        : "bg-yellow-400/20 text-yellow-300"
                    }`}
                  >
                    {u.role}
                  </span>
                </div>

                {/* RIGHT */}
                <div className="flex gap-2">

                  <button
                    onClick={() => changeRole(u._id, "member")}
                    className="bg-gray-500/20 text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-500/40 transition"
                  >
                    Member
                  </button>

                  <button
                    onClick={() => changeRole(u._id, "admin")}
                    className="bg-green-400/20 text-green-300 px-3 py-1 rounded-lg hover:bg-green-400/40 transition"
                  >
                    Admin
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </Layout>
  );
}