import CalendarSidebar from "./CalendarSidebar";
import CalendarLegend from "./CalendarLegend";
import CalendarEventModal from "./CalendarEventModal";
import { useEffect, useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { projectService } from "../services/projectService";
import { taskService } from "../services/taskService";

const locales = {};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const loadData = async () => {
    try {
      const [projectRes, taskRes] = await Promise.all([
        projectService.getAll(),
        taskService.getAll(),
      ]);

      setProjects(projectRes.data || []);
      setTasks(taskRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const events = useMemo(() => {
  const projectEvents = projects.map((project) => ({
    id: project._id,
    title: `📁 ${project.name}`,
    start: new Date(project.deadline),
    end: new Date(project.deadline),
    allDay: true,
    resource: {
      type: "project",
      data: project,
    },
  }));

 

  const taskEvents = tasks.map((task) => ({
    id: task._id,
    title: `✅ ${task.title}`,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    allDay: true,
    resource: {
      type: "task",
      data: task,
    },
  }));

  return [...projectEvents, ...taskEvents];
}, [projects, tasks]);

 const eventStyleGetter = (event) => {
  let backgroundColor = "#3b82f6"; // Blue (Project)

  if (event.resource.type === "task") {
    backgroundColor = "#22c55e"; // Green
  }

  const eventDate = new Date(event.start);
  const today = new Date();

  if (eventDate < today) {
    backgroundColor = "#ef4444"; // Red (Overdue)
  }

  return {
    style: {
      backgroundColor,
      borderRadius: "8px",
      border: "none",
      color: "#fff",
      padding: "2px 6px",
      fontSize: "12px",
    },
  };
};

const dayPropGetter = (date) => {
  const today = new Date();

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return {
      style: {
        backgroundColor: "#eff6ff",
        border: "2px solid #2563eb",
      },
    };
  }

  return {};
};

if (loading) {
  return (
    <div className="flex h-96 items-center justify-center">
      <p className="text-neutral-500">Loading calendar...</p>
    </div>
  );
}
return (
  <div className="space-y-6">

    <div>
      <h1 className="text-3xl font-bold">Calendar</h1>
      <p className="text-neutral-500">
        View project deadlines and task due dates.
      </p>
    </div>

    <CalendarLegend />

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">

      <div className="lg:col-span-3">

        <div
          className="rounded-xl bg-white p-5 shadow dark:bg-neutral-900"
          style={{ height: "700px" }}
        >
          <Calendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  eventPropGetter={eventStyleGetter}
  dayPropGetter={dayPropGetter}
  onSelectEvent={(event) => setSelectedEvent(event)}
  views={["month", "week", "day"]}
  defaultView="month"
  popup
/>
        </div>

      </div>

      <CalendarSidebar events={events} />

    </div>

    <CalendarEventModal
      event={selectedEvent}
      onClose={() => setSelectedEvent(null)}
    />

  </div>
);

};

export default CalendarPage;