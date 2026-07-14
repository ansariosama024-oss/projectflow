import { motion } from 'framer-motion';
import { cn } from '../utils';

const colorMap = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', icon: 'text-blue-600 dark:text-blue-400', text: 'text-blue-700 dark:text-blue-300' },
  green: { bg: 'bg-green-50 dark:bg-green-900/20', icon: 'text-green-600 dark:text-green-400', text: 'text-green-700 dark:text-green-300' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', icon: 'text-amber-600 dark:text-amber-400', text: 'text-amber-700 dark:text-amber-300' },
  red: { bg: 'bg-red-50 dark:bg-red-900/20', icon: 'text-red-600 dark:text-red-400', text: 'text-red-700 dark:text-red-300' },
  primary: { bg: 'bg-primary-50 dark:bg-primary-900/20', icon: 'text-primary-600 dark:text-primary-400', text: 'text-primary-700 dark:text-primary-300' },
  neutral: { bg: 'bg-neutral-100 dark:bg-neutral-800', icon: 'text-neutral-600 dark:text-neutral-400', text: 'text-neutral-700 dark:text-neutral-300' },
};

const StatCard = ({ label, value, icon: Icon, color = 'blue', index = 0 }) => {
  const c = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card-base p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{label}</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900 dark:text-white">{value}</p>
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', c.bg)}>
          <Icon className={cn('h-6 w-6', c.icon)} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
