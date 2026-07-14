import { cn } from '../../utils';

const Card = ({ children, className, padding = 'md', hover = false, ...props }) => {
  const padMap = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'card-base',
        padMap[padding],
        hover && 'transition-shadow duration-200 hover:shadow-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => (
  <div
    className={cn('mb-4 flex items-center justify-between', className)}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }) => (
  <h3
    className={cn('text-lg font-semibold text-neutral-900', className)}
    {...props}
  >
    {children}
  </h3>
);

export const CardBody = ({ children, className, ...props }) => (
  <div className={cn('text-sm text-neutral-600', className)} {...props}>
    {children}
  </div>
);

export default Card;
