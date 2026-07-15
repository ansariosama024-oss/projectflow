const CalendarLegend = () => {
  return (
    <div className="flex flex-wrap gap-6 rounded-xl border bg-white p-4 shadow dark:border-neutral-800 dark:bg-neutral-900">

      <div className="flex items-center gap-2">
        <span className="h-4 w-4 rounded bg-blue-500"></span>
        <span className="text-sm">Project</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-4 w-4 rounded bg-green-500"></span>
        <span className="text-sm">Task</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-4 w-4 rounded bg-red-500"></span>
        <span className="text-sm">Overdue</span>
      </div>

    </div>
  );
};

export default CalendarLegend;