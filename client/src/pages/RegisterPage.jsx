import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiUser, FiAtSign, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import AuthLayout from './AuthLayout';
import { Input, Button, Checkbox } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const password = watch('password');
  const acceptTerms = watch('acceptTerms');

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });
      toast.success('Account created successfully!');
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start managing your projects today.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          id="name"
          label="Full Name"
          placeholder="John Doe"
          icon={<FiUser className="h-4 w-4" />}
          error={errors.name?.message}
          {...register('name', {
            required: 'Full name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />

        <Input
          id="username"
          label="Username"
          placeholder="johndoe"
          icon={<FiAtSign className="h-4 w-4" />}
          error={errors.username?.message}
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 3, message: 'Username must be at least 3 characters' },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Only letters, numbers, and underscores allowed',
            },
          })}
        />

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

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
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
            label="Confirm Password"
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

        <Checkbox
          id="acceptTerms"
          label={
            <>
              I agree to the{' '}
              <span className="font-medium text-primary-300">Terms of Service</span> and{' '}
              <span className="font-medium text-primary-300">Privacy Policy</span>
            </>
          }
          error={errors.acceptTerms?.message}
          {...register('acceptTerms', {
            required: 'You must accept the terms to continue',
          })}
        />

        <Button type="submit" fullWidth size="lg" loading={isSubmitting} disabled={!acceptTerms}>
          Create Account
        </Button>

        <p className="text-center text-sm text-white/60">
          Already have an account?{' '}
          <Link
            to={ROUTES.LOGIN}
            className="font-medium text-primary-300 hover:text-primary-200 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
