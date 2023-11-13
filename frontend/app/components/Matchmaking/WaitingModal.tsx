'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Timer from '@/app/components/Matchmaking/Timer';
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
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              {modalStatus == 'searching' && (
                <span>
                  Searching for an opponent
                </span>
              )}
              {modalStatus == "success" && (
                <span>
                  <span>
                    Found an opponent! 
                  </span>
                  <span className="loading loading-bars loading-xs ml-4"></span>
                </span>
              )}
            </ModalHeader>
            <ModalBody>
              <div >
                {modalStatus == 'searching' && (
                  <div className="text-center flex flex-col items-center justify-center">

                    <Timer></Timer>
                    <p className="py-4 text-xs text-center">
                      Average waiting time:{' '}
                      {averageWaitingTime == null
                        ? "0min 0s"
                        : (averageWaitingTime / 60).toFixed(0).toString() + "min " + (averageWaitingTime % 60).toFixed(0).toString() + "s"}
                    </p>
                  </div>
                )}
                {modalStatus == "success" && (
                  <div>
                    <span>You are being redirected to the collaboration room... It may take a few seconds~</span>
                  </div>
                )}

               </div>     	
            </ModalBody>
            <ModalFooter>
                {modalStatus == 'searching' && (
                  <Button
                    color="danger" variant="ghost"
                    onClick={() => { onClose(); handleClose(); handleCancelSearch()}}
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
