import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FiPlus,
  FiSearch,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi';
import { Button, Input, Select, Badge, ProgressBar, Modal } from '../components/ui';
import { LoadingSpinner, EmptyState, ErrorState } from '../components/common';
import ProjectCard from './ProjectCard';
import ProjectFormModal from './ProjectFormModal';
import { projectService } from '../services/projectService';
import {
  PROJECT_STATUS_OPTIONS,
  PROJECT_PRIORITY_OPTIONS,
} from '../constants';
import { formatDate, getInitials, cn } from '../utils';

const sortOptions = [
  { value: 'created-desc', label: 'Newest First' },
  { value: 'created-asc', label: 'Oldest First' },
  { value: 'deadline-asc', label: 'Deadline (Soonest)' },
  { value: 'deadline-desc', label: 'Deadline (Latest)' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sort, setSort] = useState('created-desc');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: 9, total: 0, pages: 1 });

  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await projectService.getAll({
        page,
        limit: 9,
        search: search || undefined,
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
        sort,
      });
      setProjects(res.data || []);
      setPagination(res.pagination);
    } catch (err) {
      setError(true);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, priorityFilter, sort]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, priorityFilter, sort]);

  const handleCreate = () => {
    setEditingProject(null);
    setFormOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data) => {
    setFormLoading(true);
    try {
      const payload = {
        ...data,
        progress: Number(data.progress),
        startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
        deadline: new Date(data.deadline).toISOString(),
      };

      if (editingProject) {
        const res = await projectService.update(editingProject._id, payload);
        setProjects((prev) => prev.map((p) => (p._id === editingProject._id ? res.data : p)));
        toast.success('Project updated successfully');
      } else {
        const res = await projectService.create(payload);
        setProjects((prev) => [res.data, ...prev]);
        setPagination((prev) => ({ ...prev, total: prev.total + 1 }));
        toast.success('Project created successfully');
      }
      setFormOpen(false);
      setEditingProject(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await projectService.delete(deleteTarget._id);
      setProjects((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
      toast.success('Project deleted successfully');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete project');
    } finally {
      setDeleteLoading(false);
    }
  };

  const hasFilters = search || statusFilter || priorityFilter;

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Projects</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {pagination.total} {pagination.total === 1 ? 'project' : 'projects'} total
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setView('grid')}
                className={cn('rounded-l-lg p-2 transition-colors', view === 'grid' ? 'bg-primary-600 text-white' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800')}
              >
                <FiGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView('table')}
                className={cn('rounded-r-lg p-2 transition-colors', view === 'table' ? 'bg-primary-600 text-white' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800')}
              >
                <FiList className="h-4 w-4" />
              </button>
            </div>
            <Button onClick={handleCreate}>
              <FiPlus className="h-4 w-4" />
              <span className="hidden sm:inline">New Project</span>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="Search projects..."
            icon={<FiSearch className="h-4 w-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            containerClassName="lg:col-span-1"
          />
          <Select
            placeholder="All Statuses"
            options={PROJECT_STATUS_OPTIONS}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <Select
            placeholder="All Priorities"
            options={PROJECT_PRIORITY_OPTIONS}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          />
          <Select
            options={sortOptions}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSpinner label="Loading projects..." />
      ) : error ? (
        <ErrorState onRetry={fetchProjects} />
      ) : projects.length === 0 ? (
        <EmptyState
          title={hasFilters ? 'No matching projects' : 'No projects yet'}
          message={hasFilters ? 'Try adjusting your filters or search.' : 'Create your first project to get started.'}
          action={!hasFilters && <Button onClick={handleCreate}><FiPlus className="h-4 w-4" />Create Project</Button>}
        />
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard
              key={p._id}
              project={p}
              index={i}
              onEdit={handleEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      ) : (
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/50">
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-300">Name</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-300">Status</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-300">Priority</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-300">Deadline</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-300">Progress</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => {
                  const status = PROJECT_STATUS_OPTIONS.find((s) => s.value === p.status);
                  const priority = PROJECT_PRIORITY_OPTIONS.find((pr) => pr.value === p.priority);
                  return (
                    <motion.tr
                      key={p._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-neutral-100 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/30"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-neutral-900 dark:text-white">{p.name}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{p.category}</p>
                      </td>
                      <td className="px-4 py-3">{status && <Badge color={status.color}>{status.label}</Badge>}</td>
                      <td className="px-4 py-3">{priority && <Badge color={priority.color}>{priority.label}</Badge>}</td>
                      <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{formatDate(p.deadline)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <ProgressBar value={p.progress} size="sm" className="w-20" />
                          <span className="text-xs text-neutral-500">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => handleEdit(p)} className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-primary-600 dark:hover:bg-neutral-700">
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => setDeleteTarget(p)} className="rounded-md p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20">
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <FiChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            Page {page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= pagination.pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
            <FiChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Create/Edit Modal */}
      <ProjectFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingProject(null); }}
        onSubmit={handleFormSubmit}
        loading={formLoading}
        initialData={editingProject}
      />

      {/* Delete Confirmation */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete Project"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="danger" loading={deleteLoading} onClick={handleDelete}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-neutral-900 dark:text-white">{deleteTarget?.name}</span>?
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
