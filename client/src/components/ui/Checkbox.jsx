import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { cn } from '../../utils';

const Checkbox = forwardRef(
  ({ label, error, id, className, checked: controlledChecked, onChange, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(false);
    const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

    const handleChange = (e) => {
      setInternalChecked(e.target.checked);
      onChange?.(e);
    };

    return (
      <div className={cn('w-full', className)}>
        <label
          htmlFor={id}
          className="flex cursor-pointer items-start gap-2.5 select-none"
        >
          <input
            ref={ref}
            id={id}
            type="checkbox"
            checked={isChecked}
            className="peer sr-only"
            onChange={handleChange}
            {...props}
          />
          <span
            className={cn(
              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors duration-200',
              isChecked
                ? 'border-primary-600 bg-primary-600'
                : 'border-neutral-300 bg-white hover:border-neutral-400'
            )}
          >
            {isChecked && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                <FiCheck className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </motion.span>
            )}
          </span>
          {label && (
            <span className="text-sm leading-relaxed text-neutral-700">{label}</span>
          )}
        </label>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
