import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../components/ui/Button';

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 px-4 text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-7xl font-bold text-primary-600">404</p>
      <h1 className="mt-4 text-xl font-semibold text-neutral-900">Page not found</h1>
      <p className="mt-2 text-sm text-neutral-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/dashboard" className="mt-6 inline-block">
        <Button variant="outline">
          <FiArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>
    </motion.div>
  </div>
);

export default NotFoundPage;
