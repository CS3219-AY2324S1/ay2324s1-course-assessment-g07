
const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'TITLE', uid: 'title', sortable: true },
  { name: 'DIFFICULTY', uid: 'difficulty' },
  { name: 'CATEGORIES', uid: 'categories' },
  { name: 'ACTIONS', uid: 'actions' },
];

const difficultyOptions = [
  { name: 'Easy', uid: 'Easy' },
  { name: 'Medium', uid: 'Medium' },
  { name: 'Hard', uid: 'Hard' },
];

const categoriesOptions = [
  { value: 'Array', label: 'Array' },
  { value: 'String', label: 'String' },
  { value: 'Hash Table', label: 'Hash Table' },
  { value: 'Linked List', label: 'Linked List' },
  { value: 'Math', label: 'Math' },
  { value: 'Two Pointers', label: 'Two Pointers' },
  { value: 'Binary Search', label: 'Binary Search' },
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
  { value: 'Trie', label: 'Trie' },
  { value: 'Design', label: 'Design' },
  { value: 'Bit Manipulation', label: 'Bit Manipulation' },
  { value: 'Recursion', label: 'Recursion' },
  { value: 'Memoization', label: 'Memoization' },
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
  { value: 'Topological Sort', label: 'Topological Sort' },
  { value: 'Quick Sort', label: 'Quick Sort' },
  { value: 'Eulerian Circuit', label: 'Eulerian Circuit' },
];


module.exports = { difficultyOptions, categoriesOptions };
