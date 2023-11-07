import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  ModalHeader,
} from '@nextui-org/react';
interface DisconnectPopupProps {
  isOpen: boolean;
  onEndSession: () => void;
}

export const DisconnectPopup: React.FC<DisconnectPopupProps> = ({
  isOpen,
  onEndSession,
}) => {
  return (
    <Modal size="md" isOpen={isOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl">
              Opponent Disconnected
            </ModalHeader>
            <ModalBody>
              <p>Would you like to end the session?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="ghost" onPress={onClose}>
                Close
              </Button>
              <Button
                color="danger"
                variant="ghost"
                onPress={() => {
                  onEndSession();
                  onClose();
                }}
              >
                End Session
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

interface ConfirmEndPopupProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
}

export const ConfirmEndPopup: React.FC<ConfirmEndPopupProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Modal size={'lg'} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              End Session
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to end the session?</p>
              <p>
                Once you have clicked on End Session, kindly remain patient and
                wait for your opponent also ends their session.
              </p>
            </ModalBody>
            <ModalFooter className="flex">
              <Button color="default" variant="ghost" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                variant="ghost"
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
              >
                End Session
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
export const WaitingPopup: React.FC<WaitingPopupProps> = ({
  isOpen,
  onOpenChange,
  onCancel,
  isEnded,
}) => {
  if (isEnded) {
    return null;
  }
  return (
    <Modal size={'lg'} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              <span>
                Waiting for opponent
                <span className="loading loading-bars loading-xs ml-4"></span>
              </span>
            </ModalHeader>
            <ModalBody>
              <p>
                The session will only end when your opponent agrees to end the
                session!
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="ghost"
                onPress={() => {
                  onCancel();
                  onClose();
                }}
              >
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
  message: string;
}

// RedirectPopup.tsx
export const RedirectPopup: React.FC<RedirectPopupProps> = ({
  isOpen,
  message
}) => {
  if (!isOpen) return null;

  return (
    <Modal size={'lg'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-2xl">
          <span>
            Hang tight!
            <span className="loading loading-bars loading-xs ml-4"></span>
          </span>
        </ModalHeader>
        <ModalBody>
          <p className="pb-4">
            {message}
          </p>
        </ModalBody>

        {/* <div
          className="radial-progress m-4 text-red-500 relative"
          style={{ '--value': progress } as any}
        >
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500">
            {Math.round(redirectTime / 1000)}
          </p>
        </div> */}
      </ModalContent>
    </Modal>
  );
};
