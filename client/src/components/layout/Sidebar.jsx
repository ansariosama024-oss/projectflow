import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiLayout,
  FiFolder,
  FiCheckSquare,
  FiUsers,
  FiCalendar,
  FiBarChart2,
  FiSettings,
  FiX,
  FiLogOut,
} from 'react-icons/fi';
import { APP_NAME, ROUTES } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils';

const navItems = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: FiLayout },
  { to: ROUTES.PROJECTS, label: 'Projects', icon: FiFolder },
  { to: ROUTES.TASKS, label: 'Tasks', icon: FiCheckSquare },
  { to: ROUTES.TEAM, label: 'Team', icon: FiUsers },
  { to: ROUTES.CALENDAR, label: 'Calendar', icon: FiCalendar },
  { to: ROUTES.REPORTS, label: 'Reports', icon: FiBarChart2 },
  { to: ROUTES.SETTINGS, label: 'Settings', icon: FiSettings },
];

const Sidebar = ({ open, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-neutral-900/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform duration-300 dark:border-neutral-800 dark:bg-neutral-900 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <FiLayout className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-neutral-900 dark:text-white">{APP_NAME}</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-neutral-200 px-3 py-4 dark:border-neutral-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <FiLogOut className="h-5 w-5 shrink-0" />
            Logout
          </button>
          <p className="mt-3 px-3 text-xs text-neutral-400">
            {APP_NAME} v1.0.0
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
