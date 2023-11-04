'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Timer from '@/app/components/Collaboration/Timer';
import { LeftPanel, RightPanel } from '@/app/components/Collaboration/Panels';
import { DisconnectPopup, ConfirmEndPopup, WaitingPopup, RedirectPopup } from '@/app/components/Collaboration/Popups';
import CompileEvaluation from '@/app/components/Collaboration/CompileEvaluation';
import ChatComponent from '@/app/components/ChatService/ChatComponent';

const CollaborationSession = () => {
  const { sessionId } = useParams();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [userId, setUserId] = useState('');

  const [writeEditorValue, setWriteEditorValue] = useState<string>('');
  const [readEditorValue, setReadEditorValue] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(10000);

  const [compileResult, setCompileResult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState('');
  let randomQuestion = useRef<Question | null>(null);
  let description = randomQuestion.current?.description;

  const [isDisconnectPopupOpen, setIsDisconnectPopupOpen] = useState(false);
  const [isConfirmEndPopupOpen, setIsConfirmEndPopupOpen] = useState(false);
  const [isWaitingPopupOpen, setIsWaitingPopupOpen] = useState(false);
  const [isEndingSessionPopupOpen, setIsEndingSessionPopupOpen] = useState(false);
  const [progress, setProgress] = useState(100);
  const [redirectTime, setRedirectTime] = useState(5000);

  const [opponentScore, setOpponentScore] = useState(0);
  const [userConfirmedEnd, setUserConfirmedEnd] = useState(false);

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
    const url = process.env.NODE_ENV === 'production' ? process.env.COLLAB_SERVICE_URL : 'localhost:8004';
    const websocket = new WebSocket(`ws://${url}/${sessionId}`);

    const waitForQuestion = () => {
      return new Promise((resolve) => {
        const handler = (message: any) => {
          const data = JSON.parse(message.data);
          if (data.hasOwnProperty('question')) {
            const question = data.question as Question;
            resolve(question);
            websocket.removeEventListener('message', handler);
          }
        };
        websocket.addEventListener('message', handler);
      });
    };

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

      if (data.hasOwnProperty('timeLeft')) {
        setTimeLeft(data.timeLeft);
      }

      waitForQuestion().then((question) => {
        randomQuestion.current = question as Question;
      });

      if (data.type === 'requestEndSession') {
        if (data.reason === 'disconnect') {
          // Handle end session due to disconnect
          setIsDisconnectPopupOpen(true);
        } else {
          setUserConfirmedEnd(true);
        }
      }
      
      if(data.type === 'cancelled'){
        setUserConfirmedEnd(false);
      }

      if (data.type === 'END_SESSION') {
        handleEndSession();
      }

      if (data.hasOwnProperty('score')) {
        setOpponentScore(data.score);
      }

    };

    websocket.onclose = (event) => {
      console.log('WebSocket is closed', event);
      if (event.wasClean) {
        console.log('Connection closed cleanly');
      } else {
        console.log('Connection died');
      }
    };

    websocket.onerror = (event) => {
      console.log('WebSocket error:', event);
    };

    setWs(websocket);

  }, []);

  const router = useRouter();

  const handleEndClick = () => {
    setIsConfirmEndPopupOpen(true);
  };

  const handleConfirmEnd = () => {
    setIsConfirmEndPopupOpen(false);
    setIsWaitingPopupOpen(true);
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'REQUEST_END_SESSION',
        userId: userId,
        confirmEnd: userConfirmedEnd,
      });
      ws.send(message);
    };
  }

  const handleCancelEnd = () => {
    setIsConfirmEndPopupOpen(false);
  };

  const handleCancelWait = () => {
    setIsWaitingPopupOpen(false);
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'cancelEndRequest',
        userId: userId,
      });
      ws.send(message);
    };
  };



  useEffect(() => {
    if (isEndingSessionPopupOpen) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - (100 / 5), 0));
        setRedirectTime((prev) => Math.max(prev - 1000, 0));
      }, 1000);

      const timeout = setTimeout(() => {
        router.push('/dashboard');
        setIsEndingSessionPopupOpen(false);
      }, redirectTime);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isEndingSessionPopupOpen, router]);

  const handleEndSession = () => {
    localStorage.removeItem('timerExpired');
    localStorage.removeItem('saved');
    setIsEndingSessionPopupOpen(true);
  };


  const handleTimeUp = async (timeIsUp: boolean) => {
    if (timeIsUp) {
      setisTimeUp(true);
    }
  };

  const [language, setLanguage] = useState('javascript');

  const handleCompile = async () => {
    setIsLoading(true);
    try {
      const selectedLanguageId = languageIds[language];
      const editorValue = writeEditorValue;
      console.log("Editor value:", editorValue);

      const url = process.env.NODE_ENV === 'production' ? process.env.EVAL_SERVICE_URL : 'localhost:7000'; 
      
      const response = await axios.post(`http://${url}/compile`, {
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
      const editorValue = writeEditorValue;
      const questionData = randomQuestion.current;

      const url = process.env.NODE_ENV === 'production' ? process.env.EVAL_SERVICE_URL : 'localhost:7000'; 

      if (questionData) {
        const response = await axios.post(
          `http://${url}/evaluate`, // Replace with your eval-service host
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

    const score = parseScoreFromEvaluationResult(localStorage.getItem(`evaluationResult_${userId}`) ?? "");
    const message = JSON.stringify({
      score: score,
      userId: userId
    });
    sendWebSocketScore(message);

    const outcome = score > opponentScore ? 1
      : (score === opponentScore)
        ? 0
        : 2

    const sessionIdString = Array.isArray(sessionId) ? sessionId[0] : sessionId;
    const feedback = localStorage.getItem(`evaluationResult_${userId}`) || '';
    const historyData: HistoryData = {
      userId: userId,
      questionId: randomQuestion.current?.id || 0,
      difficulty: randomQuestion.current?.difficulty || 'Any',
      sessionId: String(sessionIdString),
      score: score,
      raceOutcome: outcome,
      feedback: feedback,
      submission: writeEditorValue,
      attemptedDate: new Date().toISOString(),
    };
    console.log("history data :", historyData);
    sendHistoryData(historyData);
  };

  const sendWebSocketScore = (message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.log('WebSocket is not open');
    }
  };


  interface HistoryData {
    userId: string;
    questionId: number;
    difficulty: string;
    sessionId: string;
    score: number;
    raceOutcome: number;
    feedback: string;
    submission: string;
    attemptedDate: string;
  }


  const parseScoreFromEvaluationResult = (evaluationResult: string) => {
    // Check if the evaluationResult contains "Student's Score" and a number
    const scoreRegex = /Student's Score\s*:\s*([\d.]+)\/10/i;
    const match = evaluationResult.match(scoreRegex);

    if (match && match[1]) {
      // Parse the matched score as a float and return it
      const score = parseFloat(match[1]);
      if (!isNaN(score)) {
        return score;
      }
    }

    // Return 0 if no valid score is found in the evaluationResult
    return 0;
  };


  async function sendHistoryData(data: HistoryData): Promise<History> {
    try {

      const url = process.env.NODE_ENV === 'production' ? process.env.EVAL_SERVICE_URL : 'localhost:8006'; 

      const response = await fetch(`http://${url}/history`, {
        method: 'POST',
        headers: {
          'token': localStorage.token,
          'Content-Type': 'application/json', // Add this line to specify the content type
        },
        cache: 'no-store',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle a successful response here if needed
        // You can access the response data using response.json()
        const historyData: History = await response.json();
        console.log('History Data Sent:', historyData);
        return historyData;
      } else {
        // Handle error here if the response is not OK (e.g., response.status !== 200)
        console.error('Error sending history data:', response.statusText);
        throw new Error('Error sending history data');
      }
    } catch (error) {
      // Handle any network or other errors here
      console.error('Error sending history data:', error);
      throw error;
    }
  }



  useEffect(() => {
    if (isTimeUp) {
      handleEvaluateAndCompile();
    }
  }, [isTimeUp]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const leftPanelProps = {
    language,
    setLanguage,
    writeEditorValue,
    setWriteEditorValue,
    allowed,
    sessionId,
    isTimeUp,
    description,
    userId
  };

  const rightPanelProps = {
    language,
    setLanguage,
    readEditorValue,
    setReadEditorValue,
    allowed,
    sessionId,
    isTimeUp,
    description,
    userId
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
        <button className="bg-red-500 text-white p-2 rounded fixed bottom-4 right-4" onClick={handleEndClick}>
          End
        </button>
        <ConfirmEndPopup
          isOpen={isConfirmEndPopupOpen}
          onConfirm={handleConfirmEnd}
          onCancel={handleCancelEnd}
        />
        <DisconnectPopup
          isOpen={isDisconnectPopupOpen}
          onEndSession={() => {
            setIsEndingSessionPopupOpen(true);
            setIsDisconnectPopupOpen(false);
          }}
          onClose={() => setIsDisconnectPopupOpen(false)}
        />
        <WaitingPopup isOpen={isWaitingPopupOpen} onCancel={handleCancelWait} />
        <RedirectPopup
          isOpen={isEndingSessionPopupOpen}
          progress={progress}
          redirectTime={redirectTime}
        />

        <div className='flex-1'>
          <div className='flex flex-col'>
            <div className='bg-gray-700 text-center p-1'>
              <span className='bg-yellow-200 rounded-lg p-1 text-black m-2'>
                &nbsp;Here&apos;s how you performed!&nbsp;
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
      </div >
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
        <DisconnectPopup
          isOpen={isDisconnectPopupOpen}
          onEndSession={() => {
            setIsEndingSessionPopupOpen(true);
            setIsDisconnectPopupOpen(false);
          }}
          onClose={() => setIsDisconnectPopupOpen(false)}
        />
      </div>
    );

};

export default CollaborationSession;
