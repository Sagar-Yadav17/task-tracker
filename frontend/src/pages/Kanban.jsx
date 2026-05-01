import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

export default function Kanban() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED TEMPLATE STRING
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}/status`, { status });

      // instant UI update (no reload)
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const columns = {
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* 🔥 HEADER */}
        <h1 className="text-3xl font-bold">Kanban Board</h1>

        {/* 🔥 LOADING */}
        {loading && (
          <p className="text-gray-400">Loading tasks...</p>
        )}

        {/* 🔥 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {Object.keys(columns).map((col) => (
            <div
              key={col}
              className="glass p-4 rounded-xl min-h-[400px]"
            >
              {/* Column Title */}
              <h2 className="text-lg font-semibold mb-4 capitalize text-gray-300">
                {col.replace("-", " ")}
              </h2>

              {/* Tasks */}
              <div className="space-y-3">
                {columns[col].map((task) => (
                  <div
                    key={task._id}
                    className="glass p-4 rounded-lg glow hover:scale-[1.02] transition"
                  >
                    <h4 className="font-semibold">
                      {task.title}
                    </h4>

                    {/* Status Buttons */}
                    <div className="flex gap-2 mt-3 justify-end">

                      <button
                        onClick={() =>
                          updateStatus(task._id, "todo")
                        }
                        className="bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full text-xs hover:bg-yellow-400/40 transition"
                      >
                        ●
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(task._id, "in-progress")
                        }
                        className="bg-blue-400/20 text-blue-300 px-2 py-1 rounded-full text-xs hover:bg-blue-400/40 transition"
                      >
                        ●
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(task._id, "done")
                        }
                        className="bg-green-400/20 text-green-300 px-2 py-1 rounded-full text-xs hover:bg-green-400/40 transition"
                      >
                        ●
                      </button>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>
    </Layout>
  );
}