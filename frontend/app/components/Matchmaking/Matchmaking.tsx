'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import WaitingModal from "./WaitingModal";
import {  difficultyOptions, categoriesOptions } from './data';
import {
  ButtonGroup,
  Button,
  Select,
  SelectItem,
  Tooltip,
} from '@nextui-org/react';

const Matchmaking = () => {
    const maxWaitingTime = 10;
    // const complexityTypes = ['Any', 'Easy', 'Medium', 'Hard'];
    // const questionTypes = ['Select Question Type', 'Dynamic Programming', 'String Slicing', 'Arrays', 'Sorting', 'Memoization'];
    const complexityOptions = difficultyOptions;
    const typeOptions = categoriesOptions;
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [modalStatus, setModalStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<any | null>(null);
    const [searchComplexity, setSearchComplexity] = useState(complexityOptions[0].name);
    const [searchQuestionType, setSearchQuestionType] = useState(typeOptions[0].value);
    const [averageWaitingTime, setAverageWaitingTime] = useState(0);
    const [selectedComplexity, setSelectedComplexity] = useState(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState(false);


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

      setSearchComplexity(storedComplexity || complexityOptions[0].name);
      setSearchQuestionType(storedType || typeOptions[0].value);

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
      setIsModalOpen(true);
    }

    const closeModal = () => {
      setIsModalOpen(false);
    }

    const handleQuestionTypeChange = (event: any) => {
      setSelectedQuestionType(true);
      const { anchorKey, currentKey } = event;
      const selectedValue = anchorKey || currentKey;
      setSearchQuestionType(selectedValue);
      localStorage.setItem('searchQuestionType', selectedValue);
    };

    const handleQuestionComplexityChange = (complexity: any) => {
      setSelectedComplexity(true);
      // const { anchorKey, currentKey } = event;
      // const selectedValue = anchorKey || currentKey;
      setSearchComplexity(complexity);
      localStorage.setItem('searchComplexity', complexity);
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
    const router = useRouter();
    const handleSuccessfulSearch = (sessionId : string) => {
      setModalStatus("success");
      setTimeout(() =>{
        router.push(`/collaboration/${sessionId}`);
      }, 5000);
      console.log(sessionId);

    }

    return (
        <div className="mr-4 lg:flex-grow md:w-1/1.5 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-lg mb-4 font-bold m-5">Race</h1>
          <p className="mb-1 leading-relaxed text-sm ml-5">
            Select a difficulty level and question type!
          </p>
          
          <div className="flex flex-col w-full">
            <div className="grid h-20 card bg-base-500 rounded-box place-items-center">
              <ButtonGroup>
                <Button 
                  color={selectedComplexity && searchComplexity == "Any" ? "primary" : "default"}
                  onClick={ () => handleQuestionComplexityChange("Any") }>
                  Any
                </Button>
                <Button 
                  color={selectedComplexity && searchComplexity == "Easy" ? "success" : "default"}
                  onClick={ () => handleQuestionComplexityChange("Easy") }>
                  Easy
                </Button>
                <Button 
                  color={selectedComplexity && searchComplexity == "Medium" ? "warning" : "default"}
                  onClick={ () => handleQuestionComplexityChange("Medium") }>
                  Medium
                </Button>
                <Button 
                  color={selectedComplexity && searchComplexity == "Hard" ? "danger" : "default"}
                  onClick={ () => handleQuestionComplexityChange("Hard") }>
                  Hard
                </Button>

              </ButtonGroup>

            </div>
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
            <div className="flex w-full flex-wrap gap-4 items-center justify-center">
              <Button
                variant="ghost"
                color="success"
                className="btn m-5 w-full"
                onClick={() => handleSearch(searchComplexity, searchQuestionType)}
              >
                Search for an opponent
              </Button>
            </div>
          </div>

          <WaitingModal averageWaitingTime = { averageWaitingTime } 
                        modalStatus = { modalStatus } 
                        isModalOpen = { isModalOpen }
                        handleClose = { closeModal } 
                        handleCancelSearch = { handleCancelSearch } 
                        handleRetry = {() => handleSearch(searchComplexity, searchQuestionType) }></WaitingModal>
        </div>
      );
}

export default Matchmaking;


