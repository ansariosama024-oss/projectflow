import { motion } from 'framer-motion';
import { cn } from '../../utils';

const colorMap = {
  primary: 'bg-primary-600',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
};

const ProgressBar = ({ value = 0, color = 'primary', showLabel = false, size = 'md', className }) => {
  const heightMap = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' };
  const clamped = Math.min(100, Math.max(0, value));

  const barColor = clamped >= 100 ? colorMap.green : clamped >= 75 ? colorMap.blue : clamped >= 50 ? colorMap.amber : clamped > 0 ? colorMap.primary : colorMap.red;

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700', heightMap[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('h-full rounded-full', barColor)}
        />
      </div>
      {showLabel && (
        <span className="mt-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {clamped}% complete
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
