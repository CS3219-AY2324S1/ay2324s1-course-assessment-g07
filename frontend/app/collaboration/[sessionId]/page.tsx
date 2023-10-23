'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Timer from '@/app/components/Collaboration/Timer';
import { LeftPanel, RightPanel } from '@/app/components/Collaboration/Panels';
import axios from 'axios';
import CompileEvaluation from '@/app/components/Collaboration/CompileEvaluation';
import ChatComponent from '@/app/components/ChatService/ChatComponent';

const CollaborationSession = () => {
  const { sessionId } = useParams();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [userId, setUserId] = useState('');
  const [sideJoined, setSideJoined] = useState<"left" | "right" | null>(null);

  const [leftEditorValue, setLeftEditorValue] = useState<string>('');
  const [rightEditorValue, setRightEditorValue] = useState<string>('');

  const [buttonsState, setButtonsState] = useState({ left: true, right: true });
  const [timeLeft, setTimeLeft] = useState<number>(100000);

  const [compileResult, setCompileResult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState('');
  let randomQuestion = useRef<Question | null>(null);

  const [isEndSessionPopupOpen, setIsEndSessionPopupOpen] = useState(false);

  interface Question {
    id: number,
    title: string,
    difficulty: string,
    categories: string[],
    description: string,
    question_link: string,
    solution_link: string,
  };


  const languageIds: Record<string, number> = {
    javascript: 63,
    python: 71,
    java: 81,
    csharp: 17,
  };

  const [isTimeUp, setisTimeUp] = useState<boolean>(false);

  useEffect(() => {
    const websocket = new WebSocket(`ws://localhost:8004/${sessionId}`);

    websocket.onopen = () => {
      const storedUserId = localStorage.getItem('userid');

      if (storedUserId) {
        setUserId(storedUserId);
      }

      websocket.send(JSON.stringify({ userId: storedUserId }));
    };

    websocket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received message:', data);

      if (data.hasOwnProperty('allowed')) {
        setAllowed(data.allowed);
      }
      if (data.hasOwnProperty('buttonsState')) {
        setButtonsState(data.buttonsState);
      }
      if (data.hasOwnProperty('timeLeft')) {
        setTimeLeft(data.timeLeft);
      }
      if (data.hasOwnProperty('sideJoined')) {
        setSideJoined(data.sideJoined);
      }
      if (data.hasOwnProperty('question')) {
        randomQuestion.current = data.question;
        console.log(`Type of randomQuestion: ${typeof randomQuestion}`);
        console.log(randomQuestion);
      }
      if (data.type === 'requestEndSession') {
        setIsEndSessionPopupOpen(true);
      }

      if (data.type === 'END_SESSION') {
        handleEndSession();
      }

    };

    websocket.onclose = () => {
      console.log('WebSocket is closed');
    };

    setWs(websocket);
  }, [sessionId]);

  useEffect(() => {
    console.log('Component rerendered. isEndSessionPopupOpen:', isEndSessionPopupOpen);
  }, [isEndSessionPopupOpen]);

  const handleJoin = (side: "left" | "right") => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'JOIN',
        side,
        userId
      });
      setSideJoined(side);
      ws.send(message);
    } else {
      console.log('WebSocket is not open');
    }
  };

  const router = useRouter();

  const handleEndSession = () => {
    localStorage.removeItem('timerExpired');
    router.push('/dashboard');
  };

  const handleRequestEndSession = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'REQUEST_END_SESSION',
        sideJoined,
        userId
      });
      ws.send(message);
    } else {
      console.log('WebSocket is not open');
    }
  };

  const handleAgreeToEndSession = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'REQUEST_END_SESSION',
        userId,
        confirmEnd: true
      });
      ws.send(message);
    } else {
      console.log('WebSocket is not open');
    }

    setIsEndSessionPopupOpen(false);
  };

  const handleDisagreeToEndSession = () => {
    setIsEndSessionPopupOpen(false);
  };

  const handleTimeUp = async (timeIsUp: boolean) => {
    if (timeIsUp) {
      console.log('Time is up!');
      setisTimeUp(true);
    }
  };

  const [language, setLanguage] = useState('javascript');

  const handleCompile = async () => {
    setIsLoading(true);
    try {
      const selectedLanguageId = languageIds[language];
      const editorValue = sideJoined == "left" ? leftEditorValue : rightEditorValue;
      const response = await axios.post('http://localhost:7000/compile', {
        sourceCode: editorValue,
        languageId: selectedLanguageId, // Replace with the appropriate language ID
      });
      console.log('Response:', response.data.result); // Log the response
      // Extract the compilation result from the response and set it in the state
      const compilationResult = response.data.result;
      console.log('Compilation Result:', compilationResult);
      setCompileResult(compilationResult);
      localStorage.setItem('compilationResult', compilationResult);
    } catch (error: any) {
      console.error('Error executing code:', error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleEvaluate = async () => {
    setIsLoading(true);

    try {
      const editorValue = sideJoined === "left" ? leftEditorValue : rightEditorValue;
      const questionData = randomQuestion.current;

      if (questionData) {
        const response = await axios.post(
          'http://localhost:7000/evaluate', // Replace with your eval-service host
          {
            code: editorValue,
            language: language,
            description: questionData.description,
            compilationResult: compileResult,
          }
        );

        const evaluationResult = response.data.result;
        setEvaluationResult(evaluationResult);
        localStorage.setItem(`evaluationResult_${userId}`, evaluationResult);
        console.log('Evaluation Result:', evaluationResult);
      } else {
        console.error('randomQuestion is null or undefined');
      }
    } catch (error: any) {
      console.error('Error evaluating code:', error.message);
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };



  const handleEvaluateAndCompile = async () => {
    await handleCompile(); // First, compile the code
    await handleEvaluate(); // Then, evaluate the code
  };

  useEffect(() => {
    if (isTimeUp) {
      const handleEvalAndComp = async () => {
        await handleCompile(); // First, compile the code
        await handleEvaluate(); // Then, evaluate the code
      };
      handleEvalAndComp();
    }
  }, [isTimeUp]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const leftPanelProps = {
    sideJoined,
    language,
    setLanguage,
    leftEditorValue,
    setLeftEditorValue,
    handleJoin,
    buttonsState,
    allowed,
    sessionId,
    isTimeUp,
    randomQuestion
  };

  const rightPanelProps = {
    sideJoined,
    language,
    setLanguage,
    rightEditorValue,
    setRightEditorValue,
    handleJoin,
    buttonsState,
    allowed,
    sessionId,
    isTimeUp,
    randomQuestion
  };

  const CompileEvaluationProps = {
    handleCompile,
    handleEvaluateAndCompile,
    isLoading,
    isModalOpen,
    handleCloseModal,
    compileResult,
    evaluationResult
  };

  return isTimeUp
    ? (
      <div className='min-h-screen flex flex-row'>
        <div className='flex-1'>
          <div className='flex flex-col'>
            <LeftPanel {...leftPanelProps} />
            <RightPanel {...rightPanelProps} />
          </div>
        </div>
        <button onClick={handleRequestEndSession} className="bg-red-500 text-white p-2 rounded">
          End
        </button>

        {isEndSessionPopupOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white border border-gray-300 rounded-lg p-4 w-64 shadow-lg">
              <p className="text-center text-black mb-4">Other user wants to end the session. Do you agree?</p>
              <div className="flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAgreeToEndSession}>Yes</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDisagreeToEndSession}>No</button>
              </div>
            </div>
          </div>
        )}
        <div className='flex-1'>
          <div className='flex flex-col'>
            <div className='bg-gray-700 text-center p-1'>
              <span className='bg-yellow-200 rounded-lg p-1 text-black m-2'>
                &nbsp;Here's how you performed!&nbsp;
              </span>
            </div>
            <div className='flex-2 border-dashed border-2 w-full p-10 overflow-y-auto'>
              {localStorage.getItem(`evaluationResult_${userId}`)}
            </div>
            <div className="flex-3">
              <div className='bg-gray-700 text-center p-1'>
                <span className='bg-yellow-200 rounded-lg p-1 text-black m-2'>
                  &nbsp;Chat with your opponent!&nbsp;
                </span>
              </div>
              <ChatComponent sessionId={sessionId} />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className='min-h-screen flex flex-col'>
        <div className='flex justify-between'>
          <LeftPanel {...leftPanelProps} />
          {allowed &&
            <Timer duration={timeLeft} onTimeUp={handleTimeUp} />
          }
          <RightPanel {...rightPanelProps} />
        </div>
        <CompileEvaluation {...CompileEvaluationProps} />
      </div>
    );

};

export default CollaborationSession;