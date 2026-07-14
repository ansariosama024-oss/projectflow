import { cn } from '../../utils';

const colorMap = {
  neutral: 'bg-neutral-100 text-neutral-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
};

const Badge = ({ children, color = 'neutral', className, dot = false }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        colorMap[color] || colorMap.neutral,
        className
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', `bg-${color}-500`)} />}
      {children}
    </span>
  );
};

export default Badge;
