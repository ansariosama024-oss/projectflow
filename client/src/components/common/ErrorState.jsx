import { FiAlertTriangle } from 'react-icons/fi';
import Button from '../ui/Button';

const ErrorState = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <FiAlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-neutral-800">Error</h3>
      <p className="mb-4 max-w-sm text-sm text-neutral-500">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
