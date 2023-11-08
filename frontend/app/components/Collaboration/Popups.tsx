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
  isRedirectMessage: boolean;
}

export const ConfirmEndPopup: React.FC<ConfirmEndPopupProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  isRedirectMessage,
}) => {
  return (
    <Modal size={'lg'} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              {isRedirectMessage ? 'Submit' : 'End Session'}
            </ModalHeader>
            <ModalBody>
              {isRedirectMessage ? (
                <>
                  <p>Ready to submit your work? Just double-checking!</p>
                  <p>
                    Remember, as soon as you press Submit, we will start
                    evaluating your code as it stands. So, make sure it is all
                    set and ready to go!
                  </p>
                </>
              ) : (
                <>
                  <p>Are you certain you want to wrap up this session?</p>
                  <p>
                    After you have clicked End Session, hang tight while your
                    opponent wraps up on their end too.
                  </p>
                </>
              )}
            </ModalBody>
            <ModalFooter className="flex">
              <Button color="default" variant="ghost" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color={isRedirectMessage ? 'success' : 'danger'}
                variant="ghost"
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {isRedirectMessage ? 'Submit' : 'End Session'}
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
  isRedirectMessage?: boolean;
}

// WaitingPopup.js
export const WaitingPopup: React.FC<WaitingPopupProps> = ({
  isOpen,
  onOpenChange,
  onCancel,
  isEnded,
  isRedirectMessage,
}) => {
  if (isEnded) {
    return null;
  }

  return (
    <Modal
      size={'lg'}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        onCancel();
        onclose;
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              <span>
                Waiting for Opponent
                <span className="loading loading-bars loading-xs ml-4"></span>
              </span>
            </ModalHeader>
            <ModalBody>
              <p>
                {isRedirectMessage
                  ? 'You will be redirected to the chat room once your opponent is also ready!'
                  : 'The session will only end when your opponent agrees to end the session!'}
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
  message,
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
          <p className="pb-4">{message}</p>
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
