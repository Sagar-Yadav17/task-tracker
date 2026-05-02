import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Layout({ children }) {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">

      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[999] bg-gray-900 text-white p-3 rounded-full shadow-xl border border-white/20"
      >
        ☰
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[997] md:hidden"
        />
      )}

      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-lg p-6 z-[998] shadow-2xl border-r border-white/10 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <h2 className="text-2xl font-bold mb-10 tracking-wide">
          🚀 Project Tracker
        </h2>

        {/* Nav */}
        <nav className="flex flex-col gap-3">

          {[
            { path: "/dashboard", name: "Dashboard" },
            { path: "/kanban", name: "Kanban" },
            { path: "/tasks", name: "Tasks" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)} // mobile close
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {role === "admin" && (
            <>
              <NavLink
                to="/create"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-yellow-400 hover:bg-yellow-400/10"
              >
                Create Task
              </NavLink>

              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-yellow-400 hover:bg-yellow-400/10"
              >
                ⚡ Admin Panel
              </NavLink>
            </>
          )}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <p className="text-sm text-gray-400">Logged in as:</p>
          <p className="text-white font-semibold capitalize mb-3">
            {role}
          </p>


          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 transition py-2 rounded-lg text-white font-semibold"
          >
            🔒 Logout
          </button>
        </div>
      </div>

      <div className="flex-1 pt-16 md:pt-6 px-4 md:px-6 overflow-auto w-full">
        <div className="glass p-4 md:p-6 min-h-full shadow-xl rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}