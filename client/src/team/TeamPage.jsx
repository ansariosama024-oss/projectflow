import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import toast from "react-hot-toast";
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";

import { Button, Input, Modal } from "../components/ui";
import { LoadingSpinner, EmptyState, ErrorState } from "../components/common";

import TeamFormModal from "./TeamFormModal";
import { teamService } from "../services/teamService";

const TeamPage = () => {
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [deleteMember, setDeleteMember] = useState(null);

  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadMembers = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await teamService.getAll();
      setMembers(res.data || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
  try {
    const res = await userService.getAll();
    setUsers(res.data || []);
  } catch (err) {
    toast.error("Failed to load users");
  }
};

const handleRetry = async () => {
  await Promise.all([
    loadMembers(),
    loadUsers(),
  ]);
};

  useEffect(() => {
  loadMembers();
  loadUsers();
}, []);
    const filteredMembers = members.filter((member) => {
    const name = member.user?.name || "";
    const email = member.user?.email || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleCreate = () => {
    setEditingMember(null);
    setFormOpen(true);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormOpen(true);
  };

  const handleSubmit = async (data) => {
    setFormLoading(true);

    try {
      if (editingMember) {
        const res = await teamService.update(editingMember._id, data);

        setMembers((prev) =>
          prev.map((m) =>
            m._id === editingMember._id ? res.data : m
          )
        );

        toast.success("Member updated successfully");
      } else {
        const res = await teamService.create(data);

        setMembers((prev) => [res.data, ...prev]);

        toast.success("Member added successfully");
      }

      setFormOpen(false);
      setEditingMember(null);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to save member"
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteMember) return;

    setDeleteLoading(true);

    try {
      await teamService.delete(deleteMember._id);

      setMembers((prev) =>
        prev.filter((m) => m._id !== deleteMember._id)
      );

      toast.success("Member deleted successfully");

      setDeleteMember(null);
    } catch {
      toast.error("Failed to delete member");
    } finally {
      setDeleteLoading(false);
    }
  };
    if (loading) return <LoadingSpinner label="Loading team..." />;

  if (error) return <ErrorState onRetry={handleRetry} />;

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team Members</h1>
          <p className="text-neutral-500">
            {filteredMembers.length} Members
          </p>
        </div>

        <Button onClick={handleCreate}>
          <FiPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Input
        placeholder="Search team members..."
        icon={<FiSearch className="h-4 w-4" />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredMembers.length === 0 ? (
        <EmptyState
  title={
    search
      ? "No Matching Members"
      : "No Team Members"
  }
  message={
    search
      ? "Try changing your search."
      : "Add your first team member."
  }
/>
      ) : (
        <div className="card-base overflow-hidden">

          <table className="w-full">

            <thead className="border-b">

              <tr>

                <th className="px-4 py-3 text-left">Name</th>

                <th className="px-4 py-3 text-left">Email</th>

                <th className="px-4 py-3 text-left">Role</th>

                <th className="px-4 py-3 text-left">Department</th>

                <th className="px-4 py-3 text-left">Status</th>

                <th className="px-4 py-3 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredMembers.map((member) => (

                <tr
                  key={member._id}
                  className="border-b"
                >

                  <td className="px-4 py-3">
                    {member.user?.name}
                  </td>

                  <td className="px-4 py-3">
                    {member.user?.email}
                  </td>

                  <td className="px-4 py-3">
                    {member.role}
                  </td>

                  <td className="px-4 py-3">
                    {member.department}
                  </td>

                  <td className="px-4 py-3">
                    {member.status}
                  </td>

                  <td className="px-4 py-3">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() =>
                          handleEdit(member)
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        onClick={() =>
                          setDeleteMember(member)
                        }
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

      <TeamFormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingMember(null);
        }}
        onSubmit={handleSubmit}
        loading={formLoading}
        initialData={editingMember}
        users={users.map((u) => ({
          value: u._id,
          label: `${u.name} (${u.email})`,
        }))}
      />

      <Modal
        isOpen={Boolean(deleteMember)}
        onClose={() => setDeleteMember(null)}
        title="Delete Member"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setDeleteMember(null)}
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
          Are you sure you want to delete this team
          member?
        </p>
      </Modal>

    </div>
  );
};

export default TeamPage;