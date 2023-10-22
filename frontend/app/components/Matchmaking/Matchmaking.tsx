'use client'
import React from "react";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import WaitingModal from "./WaitingModal";
import { categoriesOptions } from './data';
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
import { difficultyOptions } from "../Questions/data";

const Matchmaking = () => {
    const maxWaitingTime = 10;
    const complexityTypes = ['Easy', 'Medium', 'Hard'];
    const questionTypes = ['Select Question Type', 'Dynamic Programming', 'String Slicing', 'Arrays', 'Sorting', 'Memoization'];

    const [message, setMessage] = useState('');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [modalStatus, setModalStatus] = useState('');
    const [timeoutId, setTimeoutId] = useState<any | null>(null);
    const [searchComplexity, setSearchComplexity] = useState(complexityTypes[0]);
    const [searchQuestionType, setSearchQuestionType] = useState(questionTypes[0]);
    const [averageWaitingTime, setAverageWaitingTime] = useState(0);
    const [selectedComplexity, setSelectedComplexity] = useState(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState(false);
    const complexityOptions = [
      { value: 'Any', label: 'Any'},
      { value: 'Easy', label: 'Easy' },
      { value: 'Medium', label: 'Medium' },
      { value: 'Hard', label: 'Hard' },
    ];

    useEffect(() => {
      if (message != "") {
        console.log(message);
        try {
          const parsedMessage = JSON.parse(message);
        
          if (parsedMessage.type === 'sessionId') {
            // handleRedirectToWorkspace(parsedMessage.data);
            handleSuccessfulSearch(parsedMessage.data);
          } else if (parsedMessage.type === 'averageWaitingTime') {
            setAverageWaitingTime(parsedMessage.data);
          }
        } catch (error) {
          console.log(error);
        }
      }

    }, [message]);
  
  
    useEffect(() => {
      const storedComplexity = localStorage.getItem('searchComplexity');
      const storedType = localStorage.getItem('searchQuestionType');
      if (!storedComplexity) {
        localStorage.setItem('searchComplexity', searchComplexity);
      }
      if (!storedType) {
        localStorage.setItem('searchQuestionType', searchQuestionType);
      }

      const socket = new WebSocket('ws://localhost:8002');
  
      socket.addEventListener('open', () => {
        console.log('WebSocket connection established by user.');
        const username = localStorage.username;
        const userId = localStorage.userid;
        const request = {
          type: 'setUserInfo',
          data: {
            userId: userId,
            username: username
          }
      };
  
        socket.send(JSON.stringify(request));
      });
  
      socket.addEventListener('message', (event) => {
        const msg = event.data;
        setMessage(msg);
      });
  
      socket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
        const request = {
          type: 'disconnect'
        };
        socket.send(JSON.stringify(request));
        handleCancelSearch();
      });

      setSearchComplexity(storedComplexity || complexityTypes[0]);
      setSearchQuestionType(storedType || questionTypes[0]);

      setWs(socket);

      window.onbeforeunload = () => {
        if (socket.readyState === WebSocket.OPEN) {
            const request = {
                type: 'removeMeFromQueue',
                questionComplexity: storedComplexity || '',
                questionType: storedType || ''
            };
            socket.send(JSON.stringify(request));
        }
      };
  
      // Cleanup the WebSocket connection when the component unmounts
      return () => {
        socket.close();
      };

    }, []);


    const showModal = () => {
      const modal = document.getElementById('my_modal_1');
      if (modal instanceof HTMLDialogElement) {
        modal.showModal();
      }
    }

    const closeModal = () => {
      const modal = document.getElementById('my_modal_1');
      if (modal instanceof HTMLDialogElement) {
        modal.close(); // This will close the modal dialog
      }
    }

    const handleQuestionTypeChange = (event: any) => {
      setSelectedQuestionType(true);
      const { anchorKey, currentKey } = event;
      const selectedValue = anchorKey || currentKey;
      setSearchQuestionType(selectedValue);
      localStorage.setItem('searchQuestionType', selectedValue);
    };

    const handleQuestionComplexityChange = (event: any) => {
      setSelectedComplexity(true);
      const { anchorKey, currentKey } = event;
      const selectedValue = anchorKey || currentKey;
      setSearchComplexity(selectedValue);
      localStorage.setItem('searchComplexity', selectedValue);
    };
  
    const handleSearch = async (searchComplexity : string, searchQuestionType : string) => {
      if (!selectedComplexity) {
        toast.warning('Please select a difficulty level!');
        return;
      }
     // Check if question type selected
      if (!selectedQuestionType) {
        toast.warning('Please select a question type!');
        return;
      }
      setModalStatus("searching");

      showModal();

      // if (!searching && !isMatched && ws && ws.readyState === WebSocket.OPEN) {
      if (ws && ws.readyState === WebSocket.OPEN) {
      
        const requestForSearch = {
          type: 'searchForTeam',
          questionComplexity: searchComplexity,
          questionType: searchQuestionType
        };
    
        const searchPromise = new Promise((resolve) => {
          ws.send(JSON.stringify(requestForSearch));
  
          console.log('Started searching');
          ws.addEventListener('message', (event) => {
            const msg = event.data;
            if (msg === 'matched') {
              // setIsMatched(true);
              resolve('matched');
            }
          });
        });
    
        const timeoutPromise = new Promise((resolve) => {
          const timeoutId = setTimeout(() => {
            resolve('timeout');
          }, maxWaitingTime * 1000);
          setTimeoutId(timeoutId);
        });
  
    
        const result = await Promise.race([searchPromise, timeoutPromise]);
        // if (modalStatus === 'canceled') return;
        // console.log(modalStatus);
    
  	    if (result === 'timeout') {
          console.log('Removed from the queue due to timeout');
          handleCancelSearch();
        } else if (result === 'success') {
          console.log('Successful match');
          // handleSuccessfulSearch();
        }
      }
    };
  
    const handleRemove = (complexity : string, type : string) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        const request = {
          type: 'removeMeFromQueue',
          questionComplexity: complexity,
          questionType: type
        };
    
        ws.send(JSON.stringify(request));
        console.log('Sent request to remove from the queue');
      }
    };
  
    const handleCancelSearch = () => {
      handleRemove(searchComplexity, searchQuestionType);
      clearTimeout(timeoutId);
      setTimeoutId(null);
      setModalStatus('canceled');
    }

    const handleSuccessfulSearch = (sessionId : string) => {
      setModalStatus("success");
      // logic for redirect
      console.log(sessionId);

    }

    return (
        <div className="mr-4 lg:flex-grow md:w-1/1.5 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-lg mb-2 font-bold">Race</h1>
          <p className="mb-1 leading-relaxed text-sm">
            Select a difficulty level and question type!
          </p>
          
          <div className="flex flex-col w-full">
            <div className="grid h-20 card bg-base-500 rounded-box place-items-center">
              <Select
                label="Select complexity"
                className="max-w-xs"
                value={searchComplexity}
                defaultSelectedKey={ "Any"}

                onSelectionChange={ handleQuestionComplexityChange }
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
            {/* <div className="divider divider-vertical"></div> */}
            <div className="grid h-20 card bg-base-500 rounded-box place-items-center">
              <Select
                label="Select categories"
                className="max-w-xs"
                value={searchQuestionType}
                onSelectionChange={ handleQuestionTypeChange }
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
          <p className="mb-1 leading-relaxed text-sm">
            Click on "Search for an opponent" and we will match you up against
            an opponent!
          </p>
          <button
            className="btn btn-outline btn-success btn-block"
            onClick={() => handleSearch(searchComplexity, searchQuestionType)}
          >
            Search for an opponent
          </button>
          <WaitingModal averageWaitingTime = {averageWaitingTime} 
                        modalStatus = { modalStatus } handleClose = {closeModal} 
                        handleCancelSearch = {handleCancelSearch} handleRetry = {() => handleSearch(searchComplexity, searchQuestionType)}></WaitingModal>
        </div>
      );
}

export default Matchmaking;


