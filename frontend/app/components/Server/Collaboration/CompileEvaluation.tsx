// CompileEvaluation.tsx

import React from 'react';
import Modal from 'react-modal';


interface CompileEvaluationProps {
  handleCompile: () => void; 
  handleEvaluateAndCompile: () => void;
  isLoading: boolean;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  compileResult: string; 
  evaluationResult: string; 
}

const CompileEvaluation: React.FC<CompileEvaluationProps>= ({
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
    <div className="flex flex-col h-[calc(100vh-560px)] justify-end">
      <div className="flex justify-center space-x-4 px-4 pb-4">
        <button
          onClick={handleCompile}
          disabled={isLoading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isLoading ? '' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Execute Code
        </button>
        <button
          onClick={handleEvaluateAndCompile}
          disabled={isLoading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isLoading ? '' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Compile & Evaluate Code
        </button>
      </div>
      {compileResult && (
        <div className="bg-white rounded p-4 mt-4">
          <h2 className="text-xl font-semibold">Compilation Result:</h2>
          <p className = "text-black">{compileResult}</p>
        </div>
      )}
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
            &times;
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default CompileEvaluation;
