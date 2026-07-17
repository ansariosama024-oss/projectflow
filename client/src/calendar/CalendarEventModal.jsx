import { Modal, Button } from "../components/ui";

const CalendarEventModal = ({ event, onClose }) => {
  if (!event) return null;

  const item = event.resource.data;

  return (
    <Modal
      isOpen={Boolean(event)}
      onClose={onClose}
      title={event.resource.type === "project" ? "Project Details" : "Task Details"}
      footer={
        <Button onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="space-y-3">

        <div>
          <strong>Name:</strong>
          <p>{event.title}</p>
        </div>

        <div>
          <strong>Date:</strong>
          <p>
  {event.start instanceof Date && !isNaN(event.start)
    ? event.start.toLocaleDateString()
    : "No date"}
</p>
        </div>

        <div>
          <strong>Status:</strong>
          <p>{item.status || "-"}</p>
        </div>

        {item.priority && (
          <div>
            <strong>Priority:</strong>
            <p>{item.priority}</p>
          </div>
        )}

        {item.description && (
          <div>
            <strong>Description:</strong>
            <p>{item.description}</p>
          </div>
        )}

      </div>
    </Modal>
  );
};

export default CalendarEventModal;