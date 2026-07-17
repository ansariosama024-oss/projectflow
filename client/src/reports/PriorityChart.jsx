import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const PriorityChart = ({ tasks }) => {
  const data = [
  {
    priority: "Low",
    count: tasks.filter(
      (t) => t.priority?.trim().toLowerCase() === "low"
    ).length,
  },
  {
    priority: "Medium",
    count: tasks.filter(
      (t) => t.priority?.trim().toLowerCase() === "medium"
    ).length,
  },
  {
    priority: "High",
    count: tasks.filter(
      (t) => t.priority?.trim().toLowerCase() === "high"
    ).length,
  },
];

  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
      <h2 className="mb-4 text-lg font-semibold">
        Task Priority
      </h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="priority" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#8b5cf6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriorityChart;