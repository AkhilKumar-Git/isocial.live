import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  customBodyClass?: string; // Added for custom styling of modal body
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, customBodyClass }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-[100]"
      onClick={onClose} // Close on backdrop click
    >
      <div 
        className={`p-6 rounded-lg shadow-xl w-full max-w-md m-4 ${customBodyClass || 'bg-white'}`}
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;