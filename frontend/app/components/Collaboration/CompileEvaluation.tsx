// CompileEvaluation.tsx

import React, { useState } from 'react';
import Modal from 'react-modal';

const CompileEvaluation = ({
  handleCompile,
  handleEvaluateAndCompile,
  isLoading,
  isModalOpen,
  handleCloseModal,
  compileResult,
  evaluationResult,
}) => {

  const customModalStyles = {
    content: {
      zIndex: 6,
      width: '50%', // Adjust the width as needed
      height: '50%', // Adjust the height as needed
      margin: 'auto', // Center the modal horizontally
      top: '50%', // Adjust the vertical position
      transform: 'translateY(-50%)', // Vertically center the modal
    },
  };

  return (
    <div>
      <button
        onClick={handleCompile}
        disabled={isLoading}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isLoading && 'opacity-50 cursor-not-allowed'}`}
      >
        Execute Code
      </button>
      {isLoading && <p>Loading...</p>}
      {compileResult && (
        <div>
          <h2>Compilation Result:</h2>
          <p>{compileResult}</p>
        </div>
      )}

      <button
        onClick={handleEvaluateAndCompile}
        disabled={isLoading}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isLoading && 'opacity-50 cursor-not-allowed'}`}
      >
        Compile & Evaluate Code
      </button>
      <div>
        <Modal
          isOpen={isModalOpen}
          style={customModalStyles}
          onRequestClose={handleCloseModal}
          contentLabel="Evaluation Result"
        >
          <h2>Evaluation Result</h2>
          <div className="evaluation-result">{evaluationResult}</div>
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
          >
            &times; {/* Close button (X) */}
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default CompileEvaluation;
