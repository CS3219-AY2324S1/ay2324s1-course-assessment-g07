import React, { useState, useEffect } from 'react';
import NewQuestion from '../Questions/NewQuestion';
import QuestionList from '../Questions/QuestionList';
import { useHttpClient } from '../../hooks/http-hooks';

import './QuestionDashboard.css';

function QuestionDashboard() {
  const [loadedQuestions, setLoadedQuestions] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/questions', {
        method: 'GET',
        headers: { token: localStorage.token },
      });
      const responseData = await response.json();
      setLoadedQuestions(responseData['questions']);
    } catch (error) {}
  };

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line
  }, [sendRequest, setLoadedQuestions]);

  return (
    <div className="app-container">
      <div className="main-container">
        {localStorage.getItem('role') === 'maintainer' && (
          <div className="new-question-container">
            <NewQuestion
              fetchQuestions={fetchQuestions}
            />
          </div>
        )}
        <div className="question-list-container">
          {isLoading && (
            <div className="loader">
              <div className="loader-spinner"></div>
            </div>
          )}
          {!isLoading && (
            <QuestionList
              items={loadedQuestions}
              fetchQuestions={fetchQuestions}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionDashboard;
