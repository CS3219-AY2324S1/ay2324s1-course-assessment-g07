import React, { useState } from 'react';
import Select from 'react-select';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './NewQuestion.css';
import { toast } from 'react-toastify';

const NewQuestion = ({ fetchQuestions }) => {
  const [enteredId, setEnteredId] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedComplexity, setSelectedComplexity] = useState('');
  const [enteredLink, setEnteredLink] = useState('');
  const [error, setError] = useState('');

  const idChangeHandler = (event) => {
    setEnteredId(event.target.value);
  };

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const categoriesOptions = [
    { value: 'Array', label: 'Array' },
    { value: 'String', label: 'String' },
    { value: 'Hash Table', label: 'Hash Table' },
    { value: 'Linked List', label: 'Linked List' },
    { value: 'Math', label: 'Math' },
    { value: 'Two Pointers', label: 'Two Pointers' },
    { value: 'Binary Search', label: 'Binary Search' },
    { value: 'Divide and Conquer', label: 'Divide and Conquer' },
    { value: 'Dynamic Programming', label: 'Dynamic Programming' },
    { value: 'Greedy', label: 'Greedy' },
    { value: 'Backtracking', label: 'Backtracking' },
    { value: 'Stack', label: 'Stack' },
    { value: 'Queue', label: 'Queue' },
    { value: 'Heap', label: 'Heap' },
    { value: 'Graph', label: 'Graph' },
    { value: 'Tree', label: 'Tree' },
    { value: 'Depth-First Search', label: 'Depth-First Search' },
    { value: 'Breadth-First Search', label: 'Breadth-First Search' },
    { value: 'Union Find', label: 'Union Find' },
    { value: 'Topological Sort', label: 'Topological Sort' },
    { value: 'Trie', label: 'Trie' },
    { value: 'Design', label: 'Design' },
    { value: 'Bit Manipulation', label: 'Bit Manipulation' },
    { value: 'Recursion', label: 'Recursion' },
    { value: 'Memoization', label: 'Memoization' },
    { value: 'Math', label: 'Math' },
    { value: 'Geometry', label: 'Geometry' },
    { value: 'Random', label: 'Random' },
    { value: 'Simulation', label: 'Simulation' },
    { value: 'Brainteaser', label: 'Brainteaser' },
    { value: 'Minimax', label: 'Minimax' },
    { value: 'Sort', label: 'Sort' },
    { value: 'Counting Sort', label: 'Counting Sort' },
    { value: 'Radix Sort', label: 'Radix Sort' },
    { value: 'Binary Indexed Tree', label: 'Binary Indexed Tree' },
    { value: 'Segment Tree', label: 'Segment Tree' },
    { value: 'Binary Search Tree', label: 'Binary Search Tree' },
    { value: 'Priority Queue', label: 'Priority Queue' },
    { value: 'Divide and Conquer', label: 'Divide and Conquer' },
    { value: 'Randomized Algorithm', label: 'Randomized Algorithm' },
    { value: 'Hash Function', label: 'Hash Function' },
    { value: 'Sieve of Eratosthenes', label: 'Sieve of Eratosthenes' },
    { value: 'Memoization', label: 'Memoization' },
    { value: 'Topological Sort', label: 'Topological Sort' },
    { value: 'Quick Sort', label: 'Quick Sort' },
  ];

  const complexityOptions = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ];

  const linkChangeHandler = (event) => {
    setEnteredLink(event.target.value);
  };

  const submitQuestionHandler = async (event) => {
    event.preventDefault();

    if (selectedCategories.length === 0) {
      setError('Please select at least one category.');
      return;
    }
    if (selectedComplexity.length === 0) {
      setError('Please select a complexity.');
      return;
    }

    if (localStorage.getItem('role') !== 'maintainer') {
      toast.error('You are not authorized to add a question!');
      return;
    }

    const response = await fetch('http://localhost:5000/questions', {
      method: 'POST',
      body: JSON.stringify({
        id: enteredId,
        title: enteredTitle,
        description: enteredDescription,
        categories: selectedCategories.map((category) => category.value),
        complexity: selectedComplexity.value,
        link: enteredLink,
      }),
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
    });

    setError('');
    if (response.ok) {
      toast.success('Question added successfully!');

      console.log(response);
      fetchQuestions();
    } else {
      const responseData = await response.json();
      toast.error(responseData.message);
    }
  };

  return (
    <section id="new-question">
      <h2>Add a New Question</h2>
      <form onSubmit={submitQuestionHandler} className="new-question-form">
        <div className="form-row">
          <div className="form-col">
            <Input
              type="text"
              label="Id"
              id="id"
              value={enteredId}
              onChange={idChangeHandler}
              required
            />
          </div>
          <div className="form-col">
            <Input
              type="text"
              label="Title"
              id="title"
              value={enteredTitle}
              onChange={titleChangeHandler}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <Input
              type="text"
              label="Description"
              id="description"
              value={enteredDescription}
              onChange={descriptionChangeHandler}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="categories">Categories</label>
            <Select
              id="categories"
              options={categoriesOptions}
              isMulti
              value={selectedCategories}
              onChange={(selectedValues) =>
                setSelectedCategories(selectedValues)
              }
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="complexity">Complexity</label>
            <Select
              id="complexity"
              options={complexityOptions}
              value={selectedComplexity}
              onChange={(selectedValue) => setSelectedComplexity(selectedValue)}
            />
          </div>
          <div className="form-col">
            <Input
              type="text"
              label="Link"
              id="link"
              value={enteredLink}
              onChange={linkChangeHandler}
              required
            />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}
        <Button type="submit">ADD QUESTION</Button>
      </form>
    </section>
  );
};

export default NewQuestion;
