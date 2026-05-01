export default function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold">🚀 Project Tracker</h1>

      <div className="space-x-6">
        <a href="/dashboard" className="hover:text-blue-400">Dashboard</a>
        <a href="/kanban" className="hover:text-blue-400">Kanban</a>
        <a href="/tasks" className="hover:text-blue-400">Tasks</a>
        <a href="/create" className="hover:text-blue-400">Create</a>
        <a href="/admin" className="hover:text-blue-400">Admin</a>
      </div>
    </nav>
  );
}