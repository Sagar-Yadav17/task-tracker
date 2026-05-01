import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
  const role = localStorage.getItem("role");

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 m-4 glass p-6 flex flex-col shadow-2xl">

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
            { path: "/create", name: "Create Task" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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

          {/* 🔥 ADMIN */}
          {role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-yellow-400 text-black font-semibold"
                    : "text-yellow-400 hover:bg-yellow-400/10"
                }`
              }
            >
              ⚡ Admin Panel
            </NavLink>
          )}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <p className="text-sm text-gray-400">
            Logged in as:
          </p>
          <p className="text-white font-semibold capitalize">
            {role}
          </p>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="glass p-6 min-h-full shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
}