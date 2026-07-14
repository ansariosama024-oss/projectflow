import PagePlaceholder from '../components/common/PagePlaceholder';
import { FiSettings } from 'react-icons/fi';

const SettingsPage = () => (
  <PagePlaceholder
    title="Settings"
    description="Manage your profile, preferences, and workspace configuration."
    icon={FiSettings}
  />
);

export default SettingsPage;
