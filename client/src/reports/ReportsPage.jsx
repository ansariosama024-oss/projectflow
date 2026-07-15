import PriorityChart from "./PriorityChart";
import MonthlyTaskChart from "./MonthlyTaskChart";
import ProjectProgressChart from "./ProjectProgressChart";
import TaskStatusChart from "./TaskStatusChart";
import { useEffect, useMemo, useState } from "react";

import { projectService } from "../services/projectService";
import { taskService } from "../services/taskService";
import { teamService } from "../services/teamService";

import SummaryCards from "./SummaryCards";

const ReportsPage = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [projectRes, taskRes, teamRes] = await Promise.all([
        projectService.getAll(),
        taskService.getAll(),
        teamService.getAll(),
      ]);

      setProjects(projectRes.data || []);
      setTasks(taskRes.data || []);
      setMembers(teamRes.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const stats = useMemo(() => {
  return {
    totalProjects: projects.length,
    totalTasks: tasks.length,
    totalMembers: members.length,
    completedTasks: tasks.filter(
      (task) => task.status === "Completed"
    ).length,
  };
}, [projects, tasks, members]);
if (loading) {
  return (
    <div className="flex h-96 items-center justify-center">
      Loading reports...
    </div>
  );
}
return (
  <div className="space-y-6">

    <div>
      <h1 className="text-3xl font-bold">
        Reports
      </h1>

      <p className="text-neutral-500">
        Overview of projects, tasks and team performance.
      </p>
    </div>

    <SummaryCards stats={stats} />
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <TaskStatusChart tasks={tasks} />

  <ProjectProgressChart
  projects={projects}
  tasks={tasks}/>
  <MonthlyTaskChart tasks={tasks} />
  <PriorityChart tasks={tasks} />
</div>

  </div>
);

};

export default ReportsPage;