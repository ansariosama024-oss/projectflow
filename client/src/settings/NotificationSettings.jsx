import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import toast from "react-hot-toast";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    taskReminders: true,
    weeklyReports: false,
  });
  const loadSettings = async () => {
  try {
    const res = await userService.getNotificationSettings();

    console.log("Notification Response:", res);

    console.log(res.data);

setSettings(res.data||{
        emailNotifications: true,
        projectUpdates: true,
        taskReminders: true,
        weeklyReports: false,
      });
  } catch (error) {
    console.error(error);
    toast.error("Failed to load settings");
  }
};

useEffect(() => {
  loadSettings();
}, []);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await userService.updateNotificationSettings(settings);

    toast.success("Notification settings updated");
  } catch (error) {
    console.error(error);

    toast.error("Failed to update settings");
  }
};
console.log("Current settings state:", settings);

  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
      <h2 className="mb-6 text-xl font-semibold">
        Notifications
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <label className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <h3 className="font-medium">Email Notifications</h3>
            <p className="text-sm text-neutral-500">
              Receive important updates by email.
            </p>
          </div>

          <input
            type="checkbox"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
            className="h-5 w-5"
          />
        </label>

        <label className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <h3 className="font-medium">Project Updates</h3>
            <p className="text-sm text-neutral-500">
              Notify me when projects are updated.
            </p>
          </div>

          <input
            type="checkbox"
            name="projectUpdates"
            checked={settings.projectUpdates}
            onChange={handleChange}
            className="h-5 w-5"
          />
        </label>

        <label className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <h3 className="font-medium">Task Reminders</h3>
            <p className="text-sm text-neutral-500">
              Receive reminders before task deadlines.
            </p>
          </div>

          <input
            type="checkbox"
            name="taskReminders"
            checked={settings.taskReminders}
            onChange={handleChange}
            className="h-5 w-5"
          />
        </label>

        <label className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <h3 className="font-medium">Weekly Reports</h3>
            <p className="text-sm text-neutral-500">
              Receive a weekly productivity report.
            </p>
          </div>

          <input
            type="checkbox"
            name="weeklyReports"
            checked={settings.weeklyReports}
            onChange={handleChange}
            className="h-5 w-5"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Preferences
        </button>

      </form>
    </div>
  );
};

export default NotificationSettings;