
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import AppearanceSettings from "./AppearanceSettings";
import NotificationSettings from "./NotificationSettings";

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-neutral-500">
          Manage your account preferences and security.
        </p>
      </div>

      <ProfileSettings />

      <SecuritySettings />

      <AppearanceSettings />

      <NotificationSettings />
    </div>
  );
};

export default SettingsPage;