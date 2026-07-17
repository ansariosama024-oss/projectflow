import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/authService";

const SecuritySettings = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
  current: false,
  new: false,
  confirm: false,
});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (form.newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await authService.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password changed successfully");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
      <h2 className="mb-6 text-xl font-semibold">
        Security
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
  <label className="mb-2 block font-medium">
    Current Password
  </label>

  <div className="relative">
    <input
      type={showPassword.current ? "text" : "password"}
      name="currentPassword"
      value={form.currentPassword}
      onChange={handleChange}
      className="w-full rounded-lg border p-3 pr-12"
    />

    <button
      type="button"
      onClick={() =>
        setShowPassword({
          ...showPassword,
          current: !showPassword.current,
        })
      }
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      {showPassword.current ? <FiEyeOff /> : <FiEye />}
    </button>
  </div>
</div>

        <div>
          {/* <label className="mb-2 block font-medium">
            New Password
          </label> */}

          <div>
  <label className="mb-2 block font-medium">
    New Password
  </label>

  <div className="relative">
    <input
      type={showPassword.new ? "text" : "password"}
      name="newPassword"
      value={form.newPassword}
      onChange={handleChange}
      className="w-full rounded-lg border p-3 pr-12"
    />

    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2"
      onClick={() =>
        setShowPassword({
          ...showPassword,
          new: !showPassword.new,
        })
      }
    >
      {showPassword.new ? <FiEyeOff /> : <FiEye />}
    </button>
  </div>
</div>
        </div>

        <div>
          {/* <label className="mb-2 block font-medium">
            Confirm Password
          </label> */}

          <div>
  <label className="mb-2 block font-medium">
    Confirm Password
  </label>

  <div className="relative">
    <input
      type={showPassword.confirm ? "text" : "password"}
      name="confirmPassword"
      value={form.confirmPassword}
      onChange={handleChange}
      className="w-full rounded-lg border p-3 pr-12"
    />

    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2"
      onClick={() =>
        setShowPassword({
          ...showPassword,
          confirm: !showPassword.confirm,
        })
      }
    >
      {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
    </button>
  </div>
</div>
        </div>

        <button
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default SecuritySettings;