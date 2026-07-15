const CalendarSidebar = ({ events }) => {
  const upcoming = [...events]
    .sort((a, b) => a.start - b.start)
    .slice(0, 5);

  return (
    <div className="rounded-xl border bg-white p-4 shadow dark:border-neutral-800 dark:bg-neutral-900">

      <h3 className="mb-4 text-lg font-semibold">
        Upcoming Events
      </h3>

      <div className="space-y-3">

        {upcoming.map((event) => (

          <div
            key={event.id}
            className="rounded-lg border p-3"
          >

            <p className="font-medium">
              {event.title}
            </p>

            <p className="text-sm text-neutral-500">
              {event.start.toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default CalendarSidebar;