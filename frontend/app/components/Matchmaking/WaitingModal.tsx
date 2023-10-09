'use client';
import React from 'react';
import { useState, useEffect } from 'react';

const WaitingModal = ({
  averageWaitingTime,
  modalStatus,
  handleClose,
  handleRetry,
  handleCancelSearch,
}: any) => {
  const waitingTimeLimit = 10;
  const redirectTimeLimit = 5;
  const [searchTimer, setSearchTimer] = useState(waitingTimeLimit); // Initial timer value in seconds
  const [redirectTimer, setRedirectTimer] = useState(redirectTimeLimit); // Initial timer value in seconds

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
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box text-center flex flex-col items-center justify-center">
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
        {modalStatus == 'canceled' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className={`btn btn-outline btn-primary btn-block mb-2 m-2`}
              onClick={() => handleRetry()}
            >
              Retry
            </button>
            <button
              className={`btn btn-outline btn-error btn-block mb-2 m-2`}
              onClick={() => handleClose()}
            >
              Close
            </button>
          </div>
        )}
        {modalStatus == 'searching' && (
          <button
            className={`btn btn-outline btn-error btn-block mb-2 `}
            onClick={() => handleCancelSearch()}
          >
            Cancel
          </button>
        )}
      </div>
    </dialog>
  );
};

export default WaitingModal;
