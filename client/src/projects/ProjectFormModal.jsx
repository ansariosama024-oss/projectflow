import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Input, Select, Button } from '../components/ui';
import {
  PROJECT_STATUS_OPTIONS,
  PROJECT_PRIORITY_OPTIONS,
  PROJECT_CATEGORY_OPTIONS,
} from '../constants';

const defaultValues = {
  name: '',
  description: '',
  category: 'web',
  status: 'planning',
  priority: 'medium',
  startDate: new Date().toISOString().slice(0, 10),
  deadline: '',
  progress: 0,
};

const ProjectFormModal = ({ isOpen, onClose, onSubmit, loading, initialData }) => {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

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

  const progress = watch('progress');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Project' : 'Create New Project'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button form="project-form" type="submit" loading={loading}>
            {isEdit ? 'Save Changes' : 'Create Project'}
          </Button>
        </>
      }
    >
      <form id="project-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          id="name"
          label="Project Name"
          placeholder="Enter project name"
          error={errors.name?.message}
          {...register('name', {
            required: 'Project name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Brief project description"
            className="input-base resize-none"
            {...register('description')}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            id="category"
            label="Category"
            options={PROJECT_CATEGORY_OPTIONS}
            error={errors.category?.message}
            {...register('category', { required: 'Category is required' })}
          />
          <Select
            id="status"
            label="Status"
            options={PROJECT_STATUS_OPTIONS}
            error={errors.status?.message}
            {...register('status', { required: 'Status is required' })}
          />
          <Select
            id="priority"
            label="Priority"
            options={PROJECT_PRIORITY_OPTIONS}
            error={errors.priority?.message}
            {...register('priority', { required: 'Priority is required' })}
          />
          <Input
            id="progress"
            type="number"
            label="Progress (%)"
            min="0"
            max="100"
            error={errors.progress?.message}
            hint={progress ? `${progress}% complete` : undefined}
            {...register('progress', {
              required: 'Progress is required',
              min: { value: 0, message: 'Minimum 0' },
              max: { value: 100, message: 'Maximum 100' },
            })}
          />
          <Input
            id="startDate"
            type="date"
            label="Start Date"
            error={errors.startDate?.message}
            {...register('startDate', { required: 'Start date is required' })}
          />
          <Input
            id="deadline"
            type="date"
            label="Deadline"
            error={errors.deadline?.message}
            {...register('deadline', { required: 'Deadline is required' })}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ProjectFormModal;
