import { useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

export default function CreateTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
  });

  const handleSubmit = async () => {
    try {
      await API.post("/tasks", form);
      alert("Task Created 🚀");
      setForm({
        title: "",
        description: "",
        projectId: "",
        assignedTo: "",
      });
    } catch (err) {
      alert("Error creating task");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">

        {/* 🔥 Card */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl">

          <h1 className="text-3xl font-bold text-white mb-6">
            Create New Task 🚀
          </h1>

          <div className="grid gap-5">

            {/* Title */}
            <input
              className="input"
              placeholder="Task Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            {/* Description */}
            <textarea
              className="input"
              placeholder="Description"
              rows="3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            {/* Project ID */}
            <input
              className="input"
              placeholder="Project ID"
              value={form.projectId}
              onChange={(e) =>
                setForm({ ...form, projectId: e.target.value })
              }
            />

            {/* Assigned */}
            <input
              className="input"
              placeholder="Assign To (User ID)"
              value={form.assignedTo}
              onChange={(e) =>
                setForm({ ...form, assignedTo: e.target.value })
              }
            />

            {/* Button */}
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 transition transform text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              Create Task
            </button>

          </div>
        </div>
      </div>
    </Layout>
  );
}