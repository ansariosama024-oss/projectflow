import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import toast from "react-hot-toast";

const ProfileSettings = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

const loadProfile = async () => {
  try {
    const res = await userService.getProfile();

    console.log("Response:", res);

    // Agar axios response hai
    if (res.data?.data) {
     setForm({
  name: res.data?.name || "",
  email: res.data?.email || "",
});
    }

    // Agar service direct data return karti hai
    else if (res.data) {
      setForm({
        name: res.data.name,
        email: res.data.email,
      });
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to load profile");
  }
};

useEffect(() => {
  loadProfile();
}, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await userService.updateProfile(form);

    toast.success("Profile updated successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update profile");
  }
};

  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">

      <h2 className="mb-6 text-xl font-semibold">
        Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          className="rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          Save Changes
        </button>
      </form>

    </div>
  );
};

export default ProfileSettings;

