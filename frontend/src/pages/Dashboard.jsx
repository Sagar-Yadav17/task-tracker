import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [data, setData] = useState(null);

  const projectId = "69f45791a5474d1660610af2";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/api/projects/${projectId}/dashboard`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        {/* 🔥 LOADING */}
        {!data && (
          <div className="text-gray-400">Loading dashboard...</div>
        )}

        {/* 🔥 CARDS */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <Card
              title="Total Tasks"
              value={data.totalTasks}
              color="from-gray-700 to-gray-900"
            />

            <Card
              title="Todo"
              value={data.todo}
              color="from-yellow-400 to-yellow-600"
            />

            <Card
              title="In Progress"
              value={data.inProgress}
              color="from-blue-400 to-blue-600"
            />

            <Card
              title="Done"
              value={data.done}
              color="from-green-400 to-green-600"
            />

          </div>
        )}

      </div>
    </Layout>
  );
}

/* 🔥 CARD COMPONENT */
function Card({ title, value, color }) {
  return (
    <div
      className={`
        bg-gradient-to-br ${color}
        p-6 rounded-2xl
        shadow-xl
        hover:scale-105 hover:shadow-2xl
        transition duration-300
      `}
    >
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value || 0}</h2>
    </div>
  );
}