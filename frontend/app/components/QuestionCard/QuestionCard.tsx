import React from 'react';
import DeleteQuestion from './DeleteQuestion';

interface Question {
  id: number;
  description: string;
}

const QuestionCard = () => {
  return (
    <div className="">
      <DeleteQuestion />
    </div>
  );
};

export default QuestionCard;
