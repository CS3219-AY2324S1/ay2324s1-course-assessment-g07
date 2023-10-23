'use client'
import React from "react";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import WaitingModal from "./WaitingModal";
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
  
      setWs(socket);
  
      // Cleanup the WebSocket connection when the component unmounts
      return () => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
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
      setSearchQuestionType(event.target.value);
    };
  
    const handleSearch = async (searchComplexity : string, searchQuestionType : string) => {
      if (!searchComplexity) {
        toast.warning('Please select a difficulty level!');
        return;
      }
     // Check if question type selected
      if (searchQuestionType === 'Select Question Type') {
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
        <div className="mr-4 lg:flex-grow md:w-1/3 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-lg mb-2 font-bold">Race</h1>
          <p className="mb-1 leading-relaxed text-sm">
            Select a difficulty level and question type!
          </p>
          <button
            className={`btn btn-outline btn-success btn-block mb-2 ${
              searchComplexity === 'Easy' ? 'btn-active' : ''
            }`}
            onClick={() => setSearchComplexity('Easy')}
          >
            Easy
          </button>
          <button
            className={`btn btn-outline btn-warning btn-block mb-2 ${
              searchComplexity === 'Medium' ? 'btn-active' : ''
            }`}
            onClick={() => setSearchComplexity('Medium')}
          >
            Medium
          </button>
          <button
            className={`btn btn-outline btn-error btn-block mb-2 ${
              searchComplexity === 'Hard' ? 'btn-active' : ''
            }`}
            onClick={() => setSearchComplexity('Hard')}
          >
            Hard
          </button>
          <select
            className="select select-info w-full max-w-xs mb-2"
            value={searchQuestionType}
            onChange={ handleQuestionTypeChange }
            defaultValue="Select Question Type"
          >
            <option disabled>Select Question Type</option>
            <option>Dynamic Programming</option>
            <option>String Slicing</option>
            <option>Arrays</option>
            <option>Sorting</option>
            <option>Memoization</option>
            <option>Strings</option> //temporary
          </select>
          <p className="mb-1 leading-relaxed text-sm">
            Click on "Search for an opponent" and we will match you up against
            an opponent!
          </p>
          <button
            className="btn btn-outline btn-primary btn-block"
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


