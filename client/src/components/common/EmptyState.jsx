import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ icon: Icon = FiInbox, title = 'Nothing here yet', message, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
        <Icon className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-neutral-800">{title}</h3>
      {message && <p className="mb-4 max-w-sm text-sm text-neutral-500">{message}</p>}
      {action}
    </div>
  );
};

export default EmptyState;
