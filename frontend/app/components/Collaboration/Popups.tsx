import { Modal, ModalBody, ModalContent, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
interface DisconnectPopupProps {
  isOpen: boolean;
  onEndSession: () => void;
}

export const DisconnectPopup: React.FC<DisconnectPopupProps> = ({ isOpen, onEndSession }) => {

  return (
    <Modal isOpen={isOpen}>
      <ModalContent className="w-64 p-4 bg-black rounded-lg shadow-lg">
        {(onClose) => (
          <>
            <ModalBody className="text-center">
              <p className="text-white mb-4">Your opponent has disconnected. <br/> Would you like to end the session?</p>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button color="danger" onPress={()=>{onEndSession(); onClose()}}>End</Button>
            </ModalFooter>
          </>
        )}

      </ModalContent>
    </Modal>
  );
};

interface ConfirmEndPopupProps {
  isOpen: boolean;
  onOpenChange: () => void,
  onConfirm: () => void;
}

export const ConfirmEndPopup: React.FC<ConfirmEndPopupProps> = ({ isOpen, onOpenChange, onConfirm }) => {

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="w-64 p-6 rounded-lg shadow-lg">
        {(onClose) => (
          <>
            <p className="text-center text-white mb-4">
              Are you sure you want to end the session?
            </p>
            <ModalFooter className="justify-between">
              <Button color="success" variant = "light" onPress={() => { onConfirm(); onClose() }}>
                Yes
              </Button>
              <Button color="default" variant="light" onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// WaitingPopupProps.ts
interface WaitingPopupProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onCancel: () => void;
  isEnded?: boolean;
}

// WaitingPopup.js
export const WaitingPopup: React.FC<WaitingPopupProps> = ({ isOpen, onOpenChange, onCancel, isEnded }) => {
  if(isEnded){
    return null;
  }
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent className="w-64 p-4 rounded-lg shadow-lg ">
        {(onClose) => (
          <>
            <p className="text-center text-white mb-4">Waiting for opponent...</p>
            <ModalFooter className="flex justify-center">
              <Button color="danger" onPress={() => { onCancel(); onClose() }}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
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
    <Modal isOpen={isOpen}>
      <ModalContent className="w-64 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <p className="text-center text-white mb-4">Redirecting you to mainpage..</p>
        <div
          className="radial-progress m-4 text-red-500 relative"
          style={{ '--value': progress } as any}
        >
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500">
            {Math.round(redirectTime / 1000)}
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
};