import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ProjectProgressChart = ({ projects = [], tasks = [] }) => {
  const data = projects.map((project) => {
    const projectTasks = tasks.filter((task) => {
      const taskProjectId =
        typeof task.project === "object"
          ? task.project?._id
          : task.project;

      return String(taskProjectId) === String(project._id);
    });

    const completedTasks = projectTasks.filter(
      (task) => task.status?.trim().toLowerCase() === "done"
    );

    const progress =
      projectTasks.length > 0
        ? Math.round((completedTasks.length / projectTasks.length) * 100)
        : 0;

    return {
      name: project.name,
      progress,
    };
  });

  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
      <h2 className="mb-4 text-lg font-semibold">
        Project Progress
      </h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar
              dataKey="progress"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectProgressChart;