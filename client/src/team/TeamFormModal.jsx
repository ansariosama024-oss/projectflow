import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Modal, Button, Select } from "../components/ui";

import {
  TEAM_ROLE_OPTIONS,
  TEAM_DEPARTMENT_OPTIONS,
  TEAM_STATUS_OPTIONS,
} from "../constants";

const defaultValues = {
  user: "",
  role: "Frontend Developer",
  department: "Development",
  status: "Active",
};

const TeamFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  initialData,
  users = [],
}) => {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData);
      } else {
        reset(defaultValues);
      }
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Team Member" : "Add Team Member"}
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="submit"
            form="team-form"
            loading={loading}
          >
            {isEdit ? "Save Changes" : "Add Member"}
          </Button>
        </>
      }
    >
      <form
        id="team-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Select
          label="User"
          placeholder="Select User"
          options={users}
          error={errors.user?.message}
          {...register("user", {
            required: "User is required",
          })}
        />

        <Select
          label="Role"
          options={TEAM_ROLE_OPTIONS}
          {...register("role")}
        />

        <Select
          label="Department"
          options={TEAM_DEPARTMENT_OPTIONS}
          {...register("department")}
        />

        <Select
          label="Status"
          options={TEAM_STATUS_OPTIONS}
          {...register("status")}
        />
      </form>
    </Modal>
  );
};

export default TeamFormModal;