import { motion } from 'framer-motion';
import { FiLayout, FiCheckCircle, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { APP_NAME } from '../constants';

const features = [
  { icon: FiTrendingUp, text: 'Track project progress in real time' },
  { icon: FiUsers, text: 'Collaborate with your team effortlessly' },
  { icon: FiCheckCircle, text: 'Manage tasks with intuitive workflows' },
];

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-neutral-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-800 to-neutral-900" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-500/30 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

      {/* Left brand panel (desktop only) */}
      <div className="relative hidden w-1/2 flex-col justify-between p-12 lg:flex">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20">
            <FiLayout className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">{APP_NAME}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md"
        >
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
            Manage your projects with clarity and focus.
          </h2>
          <ul className="space-y-4">
            {features.map(({ icon: Icon, text }, i) => (
              <motion.li
                key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 text-white/90"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm">{text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <p className="text-sm text-white/50">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>

      {/* Right form panel with glassmorphism */}
      <div className="relative flex w-full items-center justify-center p-4 sm:p-8 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20">
              <FiLayout className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">{APP_NAME}</span>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <h1 className="mb-1.5 text-2xl font-bold text-white">{title}</h1>
            {subtitle && <p className="mb-6 text-sm text-white/60">{subtitle}</p>}
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
