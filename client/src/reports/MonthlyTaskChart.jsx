import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const MonthlyTaskChart = ({ tasks }) => {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  const data = months.map((month, index) => ({
    month,
    completed: tasks.filter((task) => {
      if (task.status?.trim().toLowerCase() !== "done") {
  return false;
}

     const date = new Date(task.updatedAt);

if (isNaN(date.getTime())) {
  return false;
}

return date.getMonth() === index;
    }).length,
  }));

  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
      <h2 className="mb-4 text-lg font-semibold">
        Monthly Task Completion
      </h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="completed"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyTaskChart;