'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';

const WaitingModal = ({
  averageWaitingTime,
  modalStatus,
  isModalOpen,
  handleClose,
  handleRetry,
  handleCancelSearch,
}: any) => {
  const waitingTimeLimit = 10;
  const redirectTimeLimit = 5;
  const [searchTimer, setSearchTimer] = useState(waitingTimeLimit); // Initial timer value in seconds
  const [redirectTimer, setRedirectTimer] = useState(redirectTimeLimit); // Initial timer value in seconds

  // Create Modal
  const {
    isOpen: isOpenMatchmakingModal,
    onOpen: onOpenMatchmakingModal,
    onOpenChange: onOpenChangeMatchmakingModal,
  } = useDisclosure();

  useEffect(() => {
    if (isModalOpen) {
      onOpenMatchmakingModal();
    } 
  }, [isModalOpen]);


  useEffect(() => {
    if (modalStatus == 'searching') {
      const interval = setInterval(() => {
        setSearchTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 0.01 : 0));
      }, 10);

      return () => {
        clearInterval(interval);
      };
    } else if (modalStatus == 'success') {
      const interval = setInterval(() => {
        setRedirectTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 0.01 : 0));
      }, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [modalStatus]);

  useEffect(() => {
    if (modalStatus != 'searching') setSearchTimer(waitingTimeLimit);

    if (modalStatus == 'success') setRedirectTimer(redirectTimeLimit);
  }, [modalStatus]);

  return (
    <Modal
      isOpen={isOpenMatchmakingModal}
      onOpenChange={onOpenChangeMatchmakingModal}
      size={'lg'}
      isDismissable={false}
      backdrop={"blur"}
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="text-center flex flex-col items-center justify-center">
                {modalStatus != 'success' && (
                  <div
                    className="radial-progress m-4 text-success"
                    style={{ '--value': (searchTimer * 100) / waitingTimeLimit } as any}
                  >
                    {searchTimer.toFixed(0)}
                  </div>
                )}
                {modalStatus == 'success' && (
                  <div
                    className="radial-progress m-4 text-success"
                    style={
                      { '--value': (redirectTimer * 100) / redirectTimeLimit } as any
                    }
                  >
                    {redirectTimer.toFixed(0)}
                  </div>
                )}

                {modalStatus == 'searching' && (
                  <h3 className="font-bold text-lg text-center">
                    Searching for an opponent...
                  </h3>
                )}
                {modalStatus == 'success' && (
                  <h3 className="font-bold text-lg text-center">
                    Found an opponent! Joining the session in...
                  </h3>
                )}
                {modalStatus == 'canceled' && (
                  <h3 className="font-bold text-lg text-center">
                    Failed to find an opponent!
                  </h3>
                )}
                <p className="py-4 text-xs text-center">
                  Average waiting time:{' '}
                  {averageWaitingTime == null
                    ? 0
                    : averageWaitingTime > 10
                    ? '10+'
                    : averageWaitingTime.toFixed(1)}
                  s
                </p>
               </div>     	
            </ModalBody>
            <ModalFooter className="flex flex-col gap-4 items-center">
              {modalStatus == 'canceled' && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    color="primary" variant="ghost"
                    onClick={() => handleRetry()}
                    style={{ margin: '10px' }}
                  >
                    Retry
                  </Button>
                  <Button
                    color="danger" variant="ghost"
                    onClick={() => { onClose(); handleClose()}}
                    style={{ margin: '10px' }}
                  >
                    Close
                  </Button>
                </div>
              )}
                {modalStatus == 'searching' && (
                  <Button
                    color="danger" variant="ghost"
                    onClick={handleCancelSearch}
                    style={{ margin: '5px' }}
                  >
                    Cancel
                  </Button>
                )}

            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WaitingModal;
