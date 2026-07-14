import { forwardRef } from 'react';
import { cn } from '../../utils';

const Input = forwardRef(
  (
    {
      label,
      error,
      hint,
      icon,
      id,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'input-base',
              icon && 'pl-10',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            aria-invalid={Boolean(error)}
            {...props}
          />
        </div>
        {error ? (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 text-sm text-neutral-500">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
