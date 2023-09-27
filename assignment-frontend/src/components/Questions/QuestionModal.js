import React from 'react';
import './QuestionModal.css';

const QuestionModal = (props) => {
  const { isOpen, onClose, question } = props;

  const closeModal = () => {
    if (props.onClose) {
      onClose();
      console.log('Modal closed');
    }
  };

  return (
    <div className={`question-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>{question.title}</h2>
        <p>Description: {question.description}</p>
        {question.categories && question.categories.length > 0 && (
          <p>Categories: {question.categories.join(', ')}</p>
        )}
        <p>Complexity: {question.complexity}</p>
        <a href={question.link} target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default QuestionModal;
