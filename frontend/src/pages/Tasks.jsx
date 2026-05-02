import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}/status`, { status });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, status } : task
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* 🔥 HEADER */}
        <h1 className="text-3xl font-bold">Tasks</h1>

        {/* 🔥 LOADING */}
        {loading && (
          <p className="text-gray-400">Loading tasks...</p>
        )}

        {/* 🔥 TASK LIST */}
        <div className="grid gap-4">

          {tasks.map((task) => (
            <div
              key={task._id}
              className="glass p-5 rounded-xl flex justify-between items-center glow hover:scale-[1.01] transition"
            >
              
              {/* LEFT */}
              <div>
                <h2 className="font-semibold text-lg">
                  {task.title}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${
                    task.status === "todo"
                      ? "bg-yellow-400/20 text-yellow-300"
                      : task.status === "in-progress"
                      ? "bg-blue-400/20 text-blue-300"
                      : "bg-green-400/20 text-green-300"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              {/* RIGHT BUTTONS */}
              <div className="flex gap-2">

                <button
                  onClick={() => updateStatus(task._id, "todo")}
                  className="bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-300 px-3 py-1 rounded-lg text-sm transition"
                >
                  Todo
                </button>

                <button
                  onClick={() => updateStatus(task._id, "in-progress")}
                  className="bg-blue-400/20 hover:bg-blue-400/40 text-blue-300 px-3 py-1 rounded-lg text-sm transition"
                >
                  In Progress
                </button>

                <button
                  onClick={() => updateStatus(task._id, "done")}
                  className="bg-green-400/20 hover:bg-green-400/40 text-green-300 px-3 py-1 rounded-lg text-sm transition"
                >
                  Done
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>
    </Layout>
  );
}