import React from "react";

interface SessionExpiredModalProps {
  isOpen: boolean;
  onLoginAgain: () => void;
}

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({
  isOpen,
  onLoginAgain,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <div className="bg-black p-6 rounded-md shadow-md text-white">
        <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
        <p className="mb-4">
          Your login session has expired. Please log in again.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-[#A020F0] text-white px-4 py-2 rounded mr-2"
            onClick={onLoginAgain}
          >
            Login Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
