import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#22c55e"];
const TaskStatusChart = ({ tasks }) => {
    console.log(tasks[0]);
    console.log(tasks.map(task => task.status));
const data = [
  {
    name: "Todo",
    value: tasks.filter(
      (task) => task.status?.trim().toLowerCase() === "todo"
    ).length,
  },
  {
    name: "In Progress",
    value: tasks.filter(
      (task) => task.status?.trim().toLowerCase() === "in-progress"
    ).length,
  },
 {
  name: "Done",
  value: tasks.filter(
    (task) => task.status?.trim().toLowerCase() === "done"
  ).length,
},
];
console.log(data);
  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
      <h2 className="mb-4 text-lg font-semibold">
        Task Status
      </h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskStatusChart;