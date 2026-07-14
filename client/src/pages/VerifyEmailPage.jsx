import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { Button } from '../components/ui';
import { ROUTES } from '../constants';

const VerifyEmailPage = () => {
  return (
    <AuthLayout title="Verify your email" subtitle="Email verification is coming soon.">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/20 backdrop-blur-md ring-1 ring-primary-400/30">
          <FiMail className="h-8 w-8 text-primary-300" />
        </div>
        <p className="mb-6 text-sm text-white/70">
          This page is a placeholder. Email verification will be implemented
          in a future update. For now, you can continue using the app without
          verifying your email.
        </p>
        <Link to={ROUTES.LOGIN}>
          <Button variant="outline" fullWidth>
            <FiArrowLeft className="h-4 w-4" />
            Back to sign in
          </Button>
        </Link>
      </motion.div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
