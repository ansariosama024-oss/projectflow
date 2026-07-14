import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useState, useRef } from 'react';
import { Badge, ProgressBar } from '../components/ui';
import { useClickOutside } from '../hooks';
import {
  PROJECT_STATUS_OPTIONS,
  PROJECT_PRIORITY_OPTIONS,
} from '../constants';
import { formatDate, getInitials, cn } from '../utils';

const ProjectCard = ({ project, onEdit, onDelete, onClick, index = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useClickOutside(() => setMenuOpen(false));

  const status = PROJECT_STATUS_OPTIONS.find((s) => s.value === project.status);
  const priority = PROJECT_PRIORITY_OPTIONS.find((p) => p.value === project.priority);
  const daysLeft = Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  const overdue = daysLeft < 0 && project.status !== 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card-base p-5 transition-shadow hover:shadow-card-hover"
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1 cursor-pointer" onClick={() => onClick?.(project)}>
          <h3 className="truncate font-semibold text-neutral-900 dark:text-white">{project.name}</h3>
          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{project.category}</p>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <FiMoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-10 mt-1 w-36 overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
              <button
                onClick={() => { setMenuOpen(false); onEdit?.(project); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-700"
              >
                <FiEdit2 className="h-4 w-4" /> Edit
              </button>
              <button
                onClick={() => { setMenuOpen(false); onDelete?.(project); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <FiTrash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
        {project.description || 'No description provided.'}
      </p>

      {/* Badges */}
      <div className="mb-4 flex flex-wrap gap-2">
        {status && <Badge color={status.color}>{status.label}</Badge>}
        {priority && <Badge color={priority.color}>{priority.label}</Badge>}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-neutral-500 dark:text-neutral-400">Progress</span>
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} size="sm" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-neutral-100 pt-3 dark:border-neutral-800">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          <FiCalendar className="h-3.5 w-3.5" />
          <span className={cn(overdue && 'text-red-500 font-medium')}>
            {overdue ? `${Math.abs(daysLeft)}d overdue` : formatDate(project.deadline)}
          </span>
        </div>
        <div className="flex -space-x-2">
          {(project.teamMembers || []).slice(0, 3).map((m) => (
            <div
              key={m._id || m}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-primary-600 text-[10px] font-semibold text-white dark:border-neutral-900"
              title={m.name || m.email}
            >
              {getInitials(m.name || m.email || '?')}
            </div>
          ))}
          {(project.teamMembers || []).length === 0 && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-neutral-200 text-neutral-400 dark:border-neutral-900 dark:bg-neutral-700">
              <FiUsers className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
