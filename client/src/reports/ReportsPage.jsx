import { motion } from 'framer-motion';
import { FiBarChart2 } from 'react-icons/fi';
import PagePlaceholder from '../components/common/PagePlaceholder';

const ReportsPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <PagePlaceholder
      title="Reports"
      description="Detailed analytics, team performance, and project insights will be available here."
      icon={FiBarChart2}
    />
  </motion.div>
);

export default ReportsPage;
