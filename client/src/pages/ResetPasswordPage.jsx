import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import AuthLayout from './AuthLayout';
import { Input, Button } from '../components/ui';
import { authService } from '../services/authService';
import { ROUTES } from '../constants';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { password: '', confirmPassword: '' },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await authService.resetPassword({
        token,
        password: data.password,
      });
      toast.success('Password reset successful! Please sign in.');
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed. The link may have expired.');
    }
  };

  if (!token) {
    return (
      <AuthLayout title="Invalid request" subtitle="This reset link is missing a token.">
        <p className="mb-6 text-sm text-white/70">
          The reset link appears to be incomplete. Please request a new password reset link.
        </p>
        <Link to={ROUTES.FORGOT_PASSWORD}>
          <Button fullWidth size="lg">Request new link</Button>
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Set new password" subtitle="Enter your new password below.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="New Password"
            placeholder="At least 8 characters"
            icon={<FiLock className="h-4 w-4" />}
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-[38px] text-neutral-400 hover:text-neutral-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
          </button>
        </div>

        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            label="Confirm New Password"
            placeholder="Re-enter your password"
            icon={<FiLock className="h-4 w-4" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((s) => !s)}
            className="absolute right-3 top-[38px] text-neutral-400 hover:text-neutral-600"
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
          </button>
        </div>

        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
          Reset Password
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

export default ResetPasswordPage;
