import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";

import { Button, Input, Modal } from "../components/ui";
import { LoadingSpinner, EmptyState, ErrorState } from "../components/common";

import { taskService } from "../services/taskService";
import TaskFormModal from "../TaskFormModal";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [deleteTask, setDeleteTask] = useState(null);

  const [formLoading, setFormLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await taskService.getAll();

      setTasks(res.data || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);
    const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleSubmit = async (data) => {
    setFormLoading(true);

    try {
      if (editingTask) {
        const res = await taskService.update(editingTask._id, data);

        setTasks((prev) =>
          prev.map((t) => (t._id === editingTask._id ? res.data : t))
        );

        toast.success("Task updated successfully");
      } else {
        const res = await taskService.create(data);

        setTasks((prev) => [res.data, ...prev]);

        toast.success("Task created successfully");
      }

      setFormOpen(false);
      setEditingTask(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save task");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTask) return;

    setDeleteLoading(true);

    try {
      await taskService.delete(deleteTask._id);

      setTasks((prev) =>
        prev.filter((task) => task._id !== deleteTask._id)
      );

      toast.success("Task deleted");

      setDeleteTask(null);
    } catch (err) {
      toast.error("Failed to delete task");
    } finally {
      setDeleteLoading(false);
    }
  };
    if (loading) return <LoadingSpinner label="Loading tasks..." />;

  if (error) return <ErrorState onRetry={loadTasks} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tasks</h2>
          <p className="text-sm text-neutral-500">
            {filteredTasks.length} Tasks
          </p>
        </div>

        <Button onClick={handleCreate}>
          <FiPlus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <Input
        placeholder="Search Tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        icon={<FiSearch className="h-4 w-4" />}
      />

      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No Tasks Found"
          message="Create your first task."
        />
      ) : (
        <div className="card-base overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Project</th>
                <th className="px-4 py-3 text-left">Due Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id} className="border-b">
                  <td className="px-4 py-3">{task.title}</td>

                  <td className="px-4 py-3">
                    {task.status}
                  </td>

                  <td className="px-4 py-3">
                    {task.priority}
                  </td>

                  <td className="px-4 py-3">
                    {task.project?.name || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {task.dueDate?.slice(0, 10)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(task)}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        onClick={() => setDeleteTask(task)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TaskFormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        loading={formLoading}
        initialData={editingTask}
      />

      <Modal
        isOpen={Boolean(deleteTask)}
        onClose={() => setDeleteTask(null)}
        title="Delete Task"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setDeleteTask(null)}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              loading={deleteLoading}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        }
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{deleteTask?.title}</strong>?
        </p>
      </Modal>
    </div>
  );
};

export default TasksPage;