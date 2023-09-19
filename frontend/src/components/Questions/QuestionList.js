import React from 'react';
import QuestionItem from './QuestionItem';
import './QuestionList.css';

const QuestionList = (props) => {
  let content;
  if (!props.items || props.items.length === 0) {
    content = <p>Could not find any questions. Maybe create one?</p>;
  } else {
    content = (
      <ul className="question-list">
        {props.items.map((p) => (
          <QuestionItem
            key={p.id}
            id={p.id}
            title={p.title}
            description={p.description}
            categories={p.categories} 
            complexity={p.complexity} 
            link={p.link} 
            fetchQuestions={props.fetchQuestions}
          />
        ))}
      </ul>
    );
  }

  return <section id="questions">{content}</section>;
};

export default QuestionList;
