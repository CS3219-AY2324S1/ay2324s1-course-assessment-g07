import React, { useState } from 'react';
import QuestionModal from './QuestionModal';
import './QuestionItem.css';
import { toast } from 'react-toastify';

const QuestionItem = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const handleQuestionItemClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsQuestionModalOpen(true);
    }
  };

  const handleTitleClick = (e) => {
    e.stopPropagation();

    setIsQuestionModalOpen(true);
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
    console.log('close modal');
    console.log(isQuestionModalOpen);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    if (localStorage.getItem('role') !== 'maintainer') {
      toast.error('You are not authorized to delete a question!');
      return;
    }
    deleteQuestionHandler(props.id);
  };

  const deleteQuestionHandler = async (questionId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/questions/${questionId}`,
        {
          method: 'DELETE',
          headers: { token: localStorage.token },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
    }

    try {
      props.fetchQuestions();
      toast.success('Question deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <li className="question-item" onClick={handleQuestionItemClick}>
        <div className="question-content">
          <h2 onClick={handleTitleClick}>
            {props.id}: {props.title}
          </h2>
          {props.categories && props.categories.length > 0 && (
            <p>Categories: {props.categories.join(', ')}</p>
          )}
          <p>Complexity: {props.complexity}</p>
        </div>
        <div className="delete-container">
          {localStorage.getItem('role') === 'maintainer' && (
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </li>
      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={handleCloseQuestionModal}
        question={props}
      />
      {showDeleteModal && (
        <div className="delete-modal">
          <p>Are you sure you want to delete this question?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </>
  );
};

export default QuestionItem;
