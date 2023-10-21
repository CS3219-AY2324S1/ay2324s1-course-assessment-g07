'use client';
import React from 'react';
import { Question } from '@/app/questions/page';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Spacer,
} from '@nextui-org/react';
import { PlusIcon } from './PlusIcon';
import { VerticalDotsIcon } from './VerticalDotsIcon';
import { SearchIcon } from './SearchIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { columns, questions, difficultyOptions } from './data';
import { capitalize } from './utils';
import { toast } from 'react-toastify';

type ChipColor = 'success' | 'danger' | 'warning';
const difficultyColorMap: { [key: string]: ChipColor } = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

const INITIAL_VISIBLE_COLUMNS = [
  'id',
  'title',
  'difficulty',
  'categories',
  'actions',
];

interface QuestionsProps {
  qns: Question[];
}

const QuestionsTable: React.FC<QuestionsProps> = ({ qns }) => {
  // Create a new question
  const [enteredId, setEnteredId] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredDescription, setEnteredDescription] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [selectedComplexity, setSelectedComplexity] = React.useState('');

  // Create Question Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Question Table
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [difficultyFilter, setDifficultyFilter] = React.useState('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const submitQuestionHandler = async (event: any) => {
    event.preventDefault();
    console.log(
      enteredId,
      enteredTitle,
      enteredDescription,
      selectedCategories,
      selectedComplexity
    );
    return;

    if (selectedCategories.length === 0) {
      toast.error('Please select at least one category.');
      return;
    }
    if (selectedComplexity.length === 0) {
      toast.error('Please select a complexity.');
      return;
    }

    if (localStorage.getItem('role') !== 'maintainer') {
      toast.error('You are not authorized to add a question!');
      return;
    }

    const response = await fetch('http://localhost:8001/questions', {
      method: 'POST',
      body: JSON.stringify({
        id: enteredId,
        title: enteredTitle,
        description: enteredDescription,
        categories: selectedCategories.map((category) => category.value),
        complexity: selectedComplexity.value,
      }),
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
    });

    if (response.ok) {
      toast.success('Question added successfully!');

      console.log(response);
      // fetchQuestions();
    } else {
      const responseData = await response.json();
      toast.error(responseData.message);
    }
  };

  const idChangeHandler = (event: any) => {
    setEnteredId(event.target.value);
  };

  const titleChangeHandler = (event: any) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event: any) => {
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
  ];

  const complexityOptions = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ];

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredQuestions = [...questions];

    if (hasSearchFilter) {
      filteredQuestions = filteredQuestions.filter((question) =>
        question.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      difficultyFilter !== 'all' &&
      Array.from(difficultyFilter).length !== difficultyOptions.length
    ) {
      filteredQuestions = filteredQuestions.filter((question) =>
        Array.from(difficultyFilter).includes(question.difficulty)
      );
    }

    return filteredQuestions;
  }, [questions, filterValue, difficultyFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (
      question: {
        [x: string]: any;
        id:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.PromiseLikeOfReactNode
          | null
          | undefined;
        title:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.PromiseLikeOfReactNode
          | null
          | undefined;
        difficulty: string;
        categories: string[];
        description:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.PromiseLikeOfReactNode
          | null
          | undefined;
      },
      columnKey: string | number
    ) => {
      const cellValue = question[columnKey];

      switch (columnKey) {
        case 'id':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case 'title':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case 'difficulty':
          return (
            <Chip
              className="capitalize"
              color={difficultyColorMap[question.difficulty]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case 'categories':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon
                      className="text-default-300"
                      width={undefined}
                      height={undefined}
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: { target: { value: any } }) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback(
    (value: React.SetStateAction<string>) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue('');
      }
    },
    []
  );

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={difficultyFilter}
                selectionMode="multiple"
                onSelectionChange={setDifficultyFilter}
              >
                {difficultyOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={<PlusIcon width={undefined} height={undefined} />}
              onPress={onOpen}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {questions.length} questions
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    difficultyFilter,
    visibleColumns,
    onRowsPerPageChange,
    questions.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    // <NextUIProvider>
    //   <div className="container px-5 pb-12 mx-auto flex flex-wrap items-center">
    //     {/*<div className="ml-6 mr-4 lg:flex-grow md:w-5/6 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"> */}
    //     {/* <div className="ml-auto">
    //       <button className="btn btn-outline btn-success">Add Question</button>
    //     </div> */}

    //     {/* </div>*/}
    //   </div>
    // </NextUIProvider>
    <div className="container text-white px-5 pb-12 mx-auto flex flex-wrap items-center mt-10">
      <div className="container px-5 pb-12 mx-auto flex flex-wrap items-center">
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: 'max-h-[382px]',
          }}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === 'actions' ? 'center' : 'start'}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={'No users found'} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={'2xl'}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Question
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={submitQuestionHandler}
                  className="new-question-form"
                >
                  <Input
                    type="text"
                    label="Id"
                    id="id"
                    value={enteredId}
                    onChange={idChangeHandler}
                    required
                  />
                  <Spacer y={4} />
                  <Input
                    type="text"
                    label="Title"
                    id="title"
                    value={enteredTitle}
                    onChange={titleChangeHandler}
                    required
                  />
                  <Spacer y={4} />
                  <Input
                    type="text"
                    label="Description"
                    id="description"
                    value={enteredDescription}
                    onChange={descriptionChangeHandler}
                    required
                  />
                  <Spacer y={4} />

                  <div className="flex w-full">
                    <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                      <Select
                        label="Select complexity"
                        className="max-w-xs"
                        // id="complexity"
                        // options={complexityOptions}
                        // value={selectedComplexity}
                        onSelectionChange={setSelectedComplexity}
                      >
                        {complexityOptions.map((complexity) => (
                          <SelectItem
                            key={complexity.value}
                            value={complexity.label}
                          >
                            {complexity.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                      <Select
                        label="Select categories"
                        className="max-w-xs"
                        // id="categories"
                        // options={categoriesOptions}
                        selectionMode="multiple"
                        // value={selectedCategories}
                        onSelectionChange={setSelectedCategories}
                      >
                        {categoriesOptions.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.label}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  className="mr-auto"
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={submitQuestionHandler}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default QuestionsTable;
