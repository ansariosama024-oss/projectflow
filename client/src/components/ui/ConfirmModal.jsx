import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({
  isOpen,
  title,
 message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-neutral-900">

              <h2 className="text-xl font-semibold">
                {title}
              </h2>

              <p className="mt-3 text-neutral-500">
                {message}
              </p>

              <div className="mt-8 flex justify-end gap-3">

                <button
                  onClick={onCancel}
                  className="rounded-lg border px-4 py-2"
                >
                  {cancelText}
                </button>

                <button
                  disabled={loading}
                  onClick={onConfirm}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? "Deleting..." : confirmText}
                </button>

              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;