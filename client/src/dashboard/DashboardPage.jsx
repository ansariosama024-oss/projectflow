import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FiFolder,
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiPlus,
  FiUserPlus,
  FiCalendar,
  FiArrowRight,
  FiTrendingUp,
} from 'react-icons/fi';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle } from '../components/ui';
import StatCard from './StatCard';
import { LoadingSpinner, EmptyState, ErrorState } from '../components/common';
import { projectService } from '../services/projectService';
import { useTheme } from '../context/ThemeContext';
import {
  PROJECT_STATUS_OPTIONS,
} from '../constants';
import { formatDate, getInitials, cn } from '../utils';

const statusColorMap = {
  planning: '#94a3b8',
  active: '#3b82f6',
  'on-hold': '#f59e0b',
  completed: '#22c55e',
  cancelled: '#ef4444',
};

const priorityColorMap = {
  low: '#94a3b8',
  medium: '#3b82f6',
  high: '#f59e0b',
  urgent: '#ef4444',
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [statsRes, projectsRes] = await Promise.all([
        projectService.getStats(),
        projectService.getAll({ limit: 5, sort: 'deadline-asc' }),
      ]);
      setStats(statsRes.data);
      setProjects(projectsRes.data || []);
    } catch (err) {
      setError(true);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const tooltipStyle = {
    backgroundColor: isDark ? '#1e293b' : '#fff',
    border: `1px solid ${gridColor}`,
    borderRadius: '8px',
    fontSize: '12px',
    color: isDark ? '#f8fafc' : '#0f172a',
  };

  // Build chart data from projects
  const statusData = PROJECT_STATUS_OPTIONS.map((s) => ({
    name: s.label,
    value: projects.filter((p) => p.status === s.value).length,
    color: statusColorMap[s.value],
  })).filter((d) => d.value > 0);

  const progressData = projects.slice(0, 5).map((p) => ({
    name: p.name.length > 15 ? p.name.slice(0, 15) + '...' : p.name,
    progress: p.progress,
  }));

  const weeklyData = [
    { day: 'Mon', tasks: 8, completed: 5 },
    { day: 'Tue', tasks: 12, completed: 9 },
    { day: 'Wed', tasks: 6, completed: 4 },
    { day: 'Thu', tasks: 14, completed: 10 },
    { day: 'Fri', tasks: 10, completed: 8 },
    { day: 'Sat', tasks: 4, completed: 3 },
    { day: 'Sun', tasks: 2, completed: 1 },
  ];

  const upcomingDeadlines = projects
    .filter((p) => p.status !== 'completed' && p.status !== 'cancelled')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 4);

  const quickActions = [
    { label: 'Create Project', icon: FiPlus, color: 'blue', action: () => navigate('/projects') },
    { label: 'Create Task', icon: FiCheckCircle, color: 'green', action: () => navigate('/tasks') },
    { label: 'Invite Member', icon: FiUserPlus, color: 'amber', action: () => navigate('/team') },
  ];

  if (loading) return <LoadingSpinner label="Loading dashboard..." />;

  if (error) return <ErrorState onRetry={fetchData} />;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard index={0} label="Total Projects" value={stats?.total ?? 0} icon={FiFolder} color="primary" />
        <StatCard index={1} label="Active Projects" value={stats?.active ?? 0} icon={FiActivity} color="blue" />
        <StatCard index={2} label="Completed" value={stats?.completed ?? 0} icon={FiCheckCircle} color="green" />
        <StatCard index={3} label="Planning" value={stats?.planning ?? 0} icon={FiClock} color="amber" />
        <StatCard index={4} label="On Hold" value={stats?.onHold ?? 0} icon={FiAlertCircle} color="red" />
        <StatCard index={5} label="Avg Progress" value={`${Math.round(stats?.avgProgress || 0)}%`} icon={FiTrendingUp} color="neutral" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Project Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          {progressData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={{ fill: axisColor, fontSize: 12 }} />
                <YAxis tick={{ fill: axisColor, fontSize: 12 }} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="progress" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Progress %" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No projects yet" message="Create a project to see progress charts." />
          )}
        </Card>

        {/* Task Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px', color: axisColor }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No data" message="Add projects to see status distribution." />
          )}
        </Card>
      </div>

      {/* Weekly Productivity */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Productivity</CardTitle>
        </CardHeader>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="taskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="doneGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="day" tick={{ fill: axisColor, fontSize: 12 }} />
            <YAxis tick={{ fill: axisColor, fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '12px', color: axisColor }} />
            <Area type="monotone" dataKey="tasks" stroke="#3b82f6" fill="url(#taskGrad)" name="Tasks" />
            <Area type="monotone" dataKey="completed" stroke="#22c55e" fill="url(#doneGrad)" name="Completed" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <FiCalendar className="h-5 w-5 text-neutral-400" />
          </CardHeader>
          {upcomingDeadlines.length > 0 ? (
            <div className="space-y-3">
              {upcomingDeadlines.map((p) => {
                const daysLeft = Math.ceil((new Date(p.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                const overdue = daysLeft < 0;
                return (
                  <div key={p._id} className="flex items-center gap-3 rounded-lg border border-neutral-100 p-3 dark:border-neutral-800">
                    <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', overdue ? 'bg-red-50 dark:bg-red-900/20' : 'bg-primary-50 dark:bg-primary-900/20')}>
                      <FiFolder className={cn('h-5 w-5', overdue ? 'text-red-500' : 'text-primary-500')} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">{p.name}</p>
                      <p className={cn('text-xs', overdue ? 'text-red-500' : 'text-neutral-500 dark:text-neutral-400')}>
                        {overdue ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-neutral-400">{formatDate(p.deadline)}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState title="No deadlines" message="No upcoming project deadlines." />
          )}
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <FiActivity className="h-5 w-5 text-neutral-400" />
          </CardHeader>
          {projects.length > 0 ? (
            <div className="space-y-3">
              {projects.slice(0, 4).map((p) => (
                <div key={p._id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white">
                    {getInitials(p.createdBy?.name || 'U')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="font-medium">{p.createdBy?.name || 'Someone'}</span> created{' '}
                      <span className="font-medium">{p.name}</span>
                    </p>
                    <p className="text-xs text-neutral-400">{formatDate(p.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No activity" message="Project activity will appear here." />
          )}
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {quickActions.map((action) => {
              const colorClasses = {
                blue: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30',
                green: 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30',
                amber: 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/30',
              };
              return (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.action}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg border p-4 text-sm font-medium transition-colors',
                    colorClasses[action.color]
                  )}
                >
                  <action.icon className="h-5 w-5" />
                  {action.label}
                  <FiArrowRight className="ml-auto h-4 w-4" />
                </motion.button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
