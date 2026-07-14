import Spinner from '../ui/Spinner';

const LoadingSpinner = ({ label = 'Loading...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Spinner size="lg" />
      <p className="text-sm text-neutral-500">{label}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
