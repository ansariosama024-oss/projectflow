import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import AuthLayout from './AuthLayout';
import { Input, Button } from '../components/ui';
import { authService } from '../services/authService';
import { ROUTES } from '../constants';

const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const [resetUrl, setResetUrl] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '' } });

  const onSubmit = async (data) => {
    try {
      const res = await authService.forgotPassword({ email: data.email });
      setSent(true);
      if (res.data?.resetUrl) setResetUrl(res.data.resetUrl);
      toast.success('Reset instructions sent. Check your email.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset email.');
    }
  };

  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle="We've sent password reset instructions.">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 backdrop-blur-md ring-1 ring-green-400/30">
            <FiCheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <p className="mb-6 text-sm text-white/70">
            If an account exists for that email, a reset link has been sent.
            The link will expire in 10 minutes.
          </p>
          {resetUrl && (
            <div className="mb-6 rounded-lg border border-white/20 bg-white/5 p-4 text-left">
              <p className="mb-2 text-xs font-medium text-white/50">
                Dev mode — reset link:
              </p>
              <Link
                to={resetUrl.replace(window.location.origin, '')}
                className="break-all text-sm text-primary-300 hover:underline"
              >
                {resetUrl}
              </Link>
            </div>
          )}
          <Link to={ROUTES.LOGIN}>
            <Button variant="outline" fullWidth>
              <FiArrowLeft className="h-4 w-4" />
              Back to sign in
            </Button>
          </Link>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot password" subtitle="Enter your email and we'll send you a reset link.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          icon={<FiMail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Please enter a valid email address',
            },
          })}
        />

        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
          Send Reset Link
        </Button>

        <Link
          to={ROUTES.LOGIN}
          className="flex items-center justify-center gap-2 text-sm text-white/60 hover:text-white/80"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
