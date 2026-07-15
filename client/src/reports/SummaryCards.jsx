const SummaryCards = ({ stats }) => {
  const cards = [
    {
      title: "Projects",
      value: stats.totalProjects,
    },
    {
      title: "Tasks",
      value: stats.totalTasks,
    },
    {
      title: "Team Members",
      value: stats.totalMembers,
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900"
        >
          <p className="text-sm text-neutral-500">
            {card.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;