'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Timer from '@/app/components/Collaboration/Timer';
import { LeftPanel, RightPanel } from '@/app/components/Collaboration/Panels';
import {
  DisconnectPopup,
  ConfirmEndPopup,
  WaitingPopup,
  RedirectPopup,
} from '@/app/components/Collaboration/Popups';
import CompileEvaluation from '@/app/components/Collaboration/CompileEvaluation';
import ChatComponent from '@/app/components/ChatService/ChatComponent';
import {
  Accordion,
  AccordionItem,
  Tabs,
  Tab,
  Card,
  CardBody,
  Textarea,
  Chip,
  Button,
  useDisclosure,
} from '@nextui-org/react';

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

  //SessionEndingStates
  const [isEndingSessionPopupOpen, setIsEndingSessionPopupOpen] =
    useState(false);
  const [isDisconnectPopupOpen, setIsDisconnectPopupOpen] = useState(false);
  const [userConfirmedEnd, setUserConfirmedEnd] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const [progress, setProgress] = useState(100);
  const [redirectTime, setRedirectTime] = useState(5000);

  const [opponentScore, setOpponentScore] = useState(0);

  const [selectedTab, setSelectedTab] = useState('Question');

  interface Question {
    id: number;
    title: string;
    difficulty: string;
    categories: string[];
    description: string;
    question_link: string;
    solution_link: string;
  }

  const languageIds: Record<string, number> = {
    javascript: 63,
    python: 71,
    java: 81,
    csharp: 17,
  };

  const [isTimeUp, setisTimeUp] = useState<boolean>(false);

  const {
    isOpen: isConfirmEndPopupOpen,
    onOpen: onConfirmEndPopupOpen,
    onOpenChange: onConfirmEndPopupChange,
  } = useDisclosure();

  const {
    isOpen: isWaitingPopupOpen,
    onOpen: onWaitingOpen,
    onOpenChange: onWaitingChange,
  } = useDisclosure();

  useEffect(() => {
    const websocket = new WebSocket(`ws://localhost:8004/${sessionId}`);

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

      if (data.type === 'cancelled') {
        setUserConfirmedEnd(false);
      }

      if (data.type === 'END_SESSION') {
        setIsEnded(true);
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
    onConfirmEndPopupOpen();
  };

  const handleConfirmEnd = () => {
    onConfirmEndPopupOpen();
    onWaitingOpen();
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'REQUEST_END_SESSION',
        userId: userId,
        confirmEnd: userConfirmedEnd,
      });
      ws.send(message);
    }
  };

  const handleCancelWait = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'cancelEndRequest',
        userId: userId,
      });
      ws.send(message);
    }
  };

  useEffect(() => {
    if (isEndingSessionPopupOpen) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 100 / 5, 0));
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
    setSelectedTab('Executed Code');
    try {
      const selectedLanguageId = languageIds[language];
      const editorValue = writeEditorValue;
      console.log('Editor value:', editorValue);
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
      const editorValue = writeEditorValue;
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
    setSelectedTab('Evaluated Code');
    await handleCompile(); // First, compile the code
    await handleEvaluate(); // Then, evaluate the code

    const score = parseScoreFromEvaluationResult(
      localStorage.getItem(`evaluationResult_${userId}`) ?? ''
    );
    const message = JSON.stringify({
      score: score,
      userId: userId,
    });
    sendWebSocketScore(message);

    const outcome = score > opponentScore ? 1 : score === opponentScore ? 0 : 2;

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
    console.log('history data :', historyData);
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
      const response = await fetch('http://localhost:8006/history', {
        method: 'POST',
        headers: {
          token: localStorage.token,
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
  };

  const leftPanelProps = {
    language,
    setLanguage,
    writeEditorValue,
    setWriteEditorValue,
    allowed,
    sessionId,
    isTimeUp,
    description,
    userId,
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
    userId,
  };

  const CompileEvaluationProps = {
    handleCompile,
    handleEvaluateAndCompile,
    isLoading,
    isModalOpen,
    handleCloseModal,
    compileResult,
    evaluationResult,
  };

  type ChipColor = 'success' | 'danger' | 'warning';
  const difficultyColorMap: { [key: string]: ChipColor } = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'danger',
  };

  let tabs = [
    {
      id: 'Executed Code',
      label: 'Executed Code',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 'Evaluated Code',
      label: 'Evaluated Code',
      content:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
  ];

  return isTimeUp ? (
    <div className="h-screen grid grid-cols-12 w-full">
      <div className="h-full col-span-3 flex flex-col overflow-y-hidden">
        {/* <div className="h-full w-full flex flex-col flex-grow"> */}
        <Tabs
          aria-label="Dynamic tabs"
          items={tabs}
          variant="underlined"
          selectedKey={selectedTab}
          // @ts-ignore
          onSelectionChange={setSelectedTab}
        >
          <Tab key="Question" title="Question">
            <div className="flex flex-col px-2 h-full">
              <p className="text-xl font-bold ">
                {randomQuestion.current?.id}. {randomQuestion.current?.title}
                <Chip
                  className="capitalize ml-2 mb-1"
                  color={
                    difficultyColorMap[
                      randomQuestion.current?.difficulty as string
                    ]
                  }
                  size="sm"
                  variant="flat"
                >
                  {randomQuestion.current?.difficulty}
                </Chip>
              </p>
              <p className="font-light mb-5">
                Categories: {randomQuestion.current?.categories.join(', ')}
              </p>

              <div className="flex flex-grow h-[calc(100vh-175px)] overflow-y-auto">
                <div
                  dangerouslySetInnerHTML={{ __html: description as string }}
                />
              </div>
            </div>
          </Tab>
          <Tab key="Executed Code" title="Executed Code">
            <Card>
              <CardBody>
                {compileResult
                  ? compileResult
                  : 'Your code has not been executed'}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="Evaluated Code" title="Evaluated Code">
            <Card>
              <CardBody>
                {evaluationResult
                  ? evaluationResult
                  : 'Your code has not been evaluated'}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
      {/* </div> */}
      <div
        className="h-full col-span-5 overflow-y-auto"
        style={{ marginTop: '1%' }}
      >
        <div className="h-46/100 w-full">
          <LeftPanel {...leftPanelProps} />
        </div>
        <div className="h-46/100 w-full px-4" style={{ marginTop: '2%' }}>
          <RightPanel {...rightPanelProps} />
        </div>
        <ConfirmEndPopup
          isOpen={isConfirmEndPopupOpen}
          onOpenChange={onConfirmEndPopupChange}
          onConfirm={handleConfirmEnd}
        />
        <DisconnectPopup
          isOpen={isDisconnectPopupOpen}
          onEndSession={() => {
            setIsEndingSessionPopupOpen(true);
            setIsDisconnectPopupOpen(false);
          }}
        />
        <WaitingPopup
          isOpen={isWaitingPopupOpen}
          onOpenChange={onWaitingChange}
          onCancel={handleCancelWait}
          isEnded={isEnded}
        />
        <RedirectPopup
          isOpen={isEndingSessionPopupOpen}
          progress={progress}
          redirectTime={redirectTime}
        />
      </div>
      <div className="h-full col-span-4 w-full">
        <div className="h-9/10 w-full flex flex-col">
          <div className="">
            <Tabs
              aria-label="Dynamic tabs 1"
              items={tabs}
              variant="underlined"
              selectedKey={'Results'}
              // @ts-ignore
            >
              <Tab key="Results" title="Results">
                <Card>
                  <CardBody>
                    <p className="max-h-40 overflow-y-auto">
                      {localStorage.getItem(`evaluationResult_${userId}`)
                        ? localStorage.getItem(`evaluationResult_${userId}`)
                        : 'Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executed Your code has not been executeds'}
                    </p>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
          <div className="h-1/2">
            <Tabs
              aria-label="Dynamic tabs 2"
              items={tabs}
              variant="underlined"
              selectedKey={'Chat'}
              // @ts-ignore
            >
              <Tab key="Chat" title="Chat">
                <Card>
                  <CardBody>
                    <ChatComponent sessionId={sessionId} />
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
          <div className="flex">
            <div className="ml-auto">
              <Button color="danger" variant="ghost" onClick={handleEndClick}>
                Leave Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="overflow-hidden grid grid-cols-12 w-full h-screen">
      <div className="h-90/100 col-span-3">
        <Tabs
          aria-label="Dynamic tabs"
          items={tabs}
          variant="underlined"
          selectedKey={selectedTab}
          // @ts-ignore
          onSelectionChange={setSelectedTab}
        >
          <Tab key="Question" title="Question">
            <div className="px-2 h-full">
              <p className="text-xl font-bold">
                {randomQuestion.current?.id}. {randomQuestion.current?.title}
                <Chip
                  className="capitalize ml-2 mb-1"
                  color={
                    difficultyColorMap[
                      randomQuestion.current?.difficulty as string
                    ]
                  }
                  size="sm"
                  variant="flat"
                >
                  {randomQuestion.current?.difficulty}
                </Chip>
              </p>
              <p className="font-light mb-5">
                Categories: {randomQuestion.current?.categories.join(', ')}
              </p>
              <div className="h-5/6 place-items-center overflow-x-visible overflow-y-scroll mt-4">
                <div
                  dangerouslySetInnerHTML={{ __html: description as string }}
                />
              </div>
            </div>
          </Tab>
          <Tab key="Executed Code" title="Executed Code">
            <Card>
              <CardBody>
                {compileResult
                  ? compileResult
                  : 'Your code has not been executed'}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="Evaluated Code" title="Evaluated Code">
            <Card>
              <CardBody>
                {evaluationResult
                  ? evaluationResult
                  : 'Your code has not been evaluated'}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>

      <div className="col-span-9 place-items-center pl-5 h-screen overflow-hidden w-full">
        <div className="grid grid-cols-12 w-full h-4/5">
          <div className="col-span-6 flex justify-between h-full w-full">
            <LeftPanel {...leftPanelProps} />
          </div>
          <div className="col-span-6 flex justify-between h-full w-full">
            <div
              className={`${
                isTimeUp ? 'items-start' : 'w-full flex-1 ml-2 mt-2 h-full '
              }`}
            >
              {allowed && <Timer duration={timeLeft} onTimeUp={handleTimeUp} />}
              <RightPanel {...rightPanelProps} />
            </div>
          </div>

          <DisconnectPopup
            isOpen={isDisconnectPopupOpen}
            onEndSession={() => {
              setIsEndingSessionPopupOpen(true);
              setIsDisconnectPopupOpen(false);
            }}
          />
        </div>
        {/* <CompileEvaluation {...CompileEvaluationProps} /> */}
        <div className="pt-16">
          <div className="flex w-full items-center justify-center">
            {/* <p className="text-xl">Console</p> */}
            <div className="flex mr-auto space-x-2">
              <Button color="secondary" variant="ghost" onClick={handleCompile}>
                Execute Code
              </Button>
              <Button
                color="primary"
                variant="ghost"
                onClick={handleEvaluateAndCompile}
              >
                Evaluate Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationSession;
