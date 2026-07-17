import { useEffect, useState } from 'react';
import { projectService } from "../services/projectService";
import { useForm } from 'react-hook-form';
import { Modal, Input, Select, Button } from '../components/ui';
import {
  TASK_STATUS_OPTIONS,
  TASK_PRIORITY_OPTIONS,
} from "../constants";

const defaultValues = {
  title: '',
  description: '',
  project: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
};

const TaskFormModal = ({ isOpen, onClose, onSubmit, loading, initialData }) => {
  const isEdit = Boolean(initialData);
const [projects, setProjects] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });///

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          ...initialData,
          startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().slice(0, 10) : '',
          deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().slice(0, 10) : '',
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [isOpen, initialData, reset]);

  const loadProjects = async () => {
  try {
    const res = await projectService.getAll();

    setProjects(
      (res.data || []).map((project) => ({
        value: project._id,
        label: project.name,
      }))
    );
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  if (isOpen) {
    loadProjects();
  }
}, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Task' : 'Create Task'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button form="task-form" type="submit" loading={loading}>
            {isEdit ? 'Save Changes' : 'Create Task'}
          </Button>
        </>
      }
    >
      <form id="task-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
       <Input
  id="title"
  label="Task Title"
  placeholder="Enter task title"
  error={errors.title?.message}
  {...register("title", {
    required: "Task title is required",
    minLength: {
      value: 2,
      message: "Task title must be at least 2 characters",
    },
  })}
/>

<div>
  <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
    Description
  </label>

  <textarea
    rows={3}
    placeholder="Task description"
    className="input-base resize-none"
    {...register("description")}
  />
</div>

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

  <Input
    id="dueDate"
    type="date"
    label="Due Date"
    error={errors.dueDate?.message}
    {...register("dueDate", {
      required: "Due date is required",
    })}
  />

  <Select
    id="status"
    label="Status"
    options={TASK_STATUS_OPTIONS}
    error={errors.status?.message}
    {...register("status")}
  />

  <Select
    id="priority"
    label="Priority"
    options={TASK_PRIORITY_OPTIONS}
    error={errors.priority?.message}
    {...register("priority")}
  />

  {/* Project dropdown abhi temporarily blank rahega */}
  <Select
    id="project"
    label="Project"
    options={projects}
    placeholder="Select Project"
    error={errors.project?.message}
    {...register("project", {
      required: "Project is required",
    })}
  />

</div> 
      </form>
    </Modal>
  );
};

export default TaskFormModal;
