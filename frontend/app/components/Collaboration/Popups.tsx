interface DisconnectPopupProps {
  isOpen: boolean;
  onEndSession: () => void;
  onClose: () => void;
}

export const DisconnectPopup: React.FC<DisconnectPopupProps> = ({ isOpen, onEndSession, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white border border-gray-300 rounded-lg p-4 w-64 shadow-lg">
        <p className="text-center text-black mb-4">The user has disconnected.</p>
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onEndSession}>End</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

interface ConfirmEndPopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// WaitingPopupProps.ts
interface WaitingPopupProps {
  isOpen: boolean;
  onCancel: () => void;
}

export const ConfirmEndPopup: React.FC<ConfirmEndPopupProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white border border-gray-300 rounded-lg p-4 w-64 shadow-lg">
        <p className="text-center text-black mb-4">Are you sure you want to end the session?</p>
        <div className="flex justify-between">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onCancel}>No</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

// WaitingPopup.js
export const WaitingPopup: React.FC<WaitingPopupProps> = ({ isOpen, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white border border-gray-300 rounded-lg p-4 w-64 shadow-lg ">
        <p className="text-center text-black mb-4">Waiting for opponent...</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onCancel}>
            Cancel
          </button>
      </div>
    </div>
  );
};

interface RedirectPopupProps {
  isOpen: boolean;
  progress: number;
  redirectTime: number;
}

// RedirectPopup.tsx
export const RedirectPopup: React.FC<RedirectPopupProps> = ({ isOpen, progress, redirectTime }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white border border-gray-300 rounded-lg p-4 w-64 shadow-lg flex flex-col items-center">
        <p className="text-center text-black mb-4">Redirecting you to mainpage..</p>
        <div
          className="radial-progress m-4 text-red-500 relative"
          style={{ '--value': progress } as any}
        >
          <p
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500"
          >
            {Math.round(redirectTime / 1000)}
          </p>
        </div>
      </div>
    </div>
  );
};