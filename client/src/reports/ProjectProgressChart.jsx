import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ProjectProgressChart = ({ projects, tasks }) => {
    
  const data = projects.map((project) => {
    const projectTasks = tasks.filter(
      (task) => task.project?._id === project._id
    );

    const completedTasks = projectTasks.filter(
   (task) => task.status?.trim().toLowerCase() === "done"
);

    const progress =
      projectTasks.length === 0
        ? 0
        : Math.round((completedTasks.length / projectTasks.length) * 100);

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
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="progress"
              radius={[8, 8, 0, 0]}
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectProgressChart;