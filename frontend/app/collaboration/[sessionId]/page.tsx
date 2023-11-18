'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import ChatComponent from '@/app/components/ChatService/ChatComponent';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Chip,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import 'katex/dist/katex.min.css';

const CollaborationSession = () => {
  const { sessionId } = useParams();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [userId, setUserId] = useState('');

  const [writeEditorValue, setWriteEditorValue] = useState<string>('');
  const [readEditorValue, setReadEditorValue] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(1800000);

  const [compileResult, setCompileResult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEvaluateLoading, setIsEvaluateLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState('');
  const [isExecuteButtonDisabled, setIsExecuteButtonDisabled] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);
  let description = randomQuestion?.description;

  //SessionEndingStates
  const [isEndingSessionPopupOpen, setIsEndingSessionPopupOpen] =
    useState(false);
  const [isRedirectTo2ndPopupOpen, setIsRedirectTo2ndPopupOpen] =
    useState(false);
  const [isDisconnectPopupOpen, setIsDisconnectPopupOpen] = useState(false);
  const [userConfirmedEnd, setUserConfirmedEnd] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isRedirect2nd, setIsRedirect2nd] = useState(false);
  const [userConfirmedRedirect, setUserConfirmedRedirect] = useState(false);


  const [progress, setProgress] = useState(100);
  const [redirectTime, setRedirectTime] = useState(5000);

  const [opponentScore, setOpponentScore] = useState<number | null>(null);

  const [selectedTab, setSelectedTab] = useState('Question');
  const [language, setLanguage] = useState('javascript');
  const [oppLang, setOppLang] = useState('javascript');

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
    javascript: 93,
    python: 92,
    java: 91,
    csharp: 76,
  };

  const [isTimeUp, setisTimeUp] = useState<boolean>(false);

  const {
    isOpen: isConfirmEndPopupOpen,
    onOpen: onConfirmEndPopupOpen,
    onOpenChange: onConfirmEndPopupChange,
  } = useDisclosure();

  const {
    isOpen: isConfirmRedirectPopupOpen,
    onOpen: onConfirmRedirectPopupOpen,
    onOpenChange: onConfirmRedirectPopupChange,
  } = useDisclosure();

  const {
    isOpen: isWaitingPopupOpen,
    onOpen: onWaitingOpen,
    onOpenChange: onWaitingChange,
  } = useDisclosure();

  const {
    isOpen: isWaiting2ndPopupOpen,
    onOpen: onWaiting2ndOpen,
    onOpenChange: onWaiting2ndChange,
  } = useDisclosure();

  useEffect(() => {
    const url = process.env.NODE_ENV === 'production' ? "34.123.40.181:30100" : 'localhost:8004';
    
    console.log("collab url: " + url);
    
    const websocket = new WebSocket(`ws://${url}/${sessionId}`);

    const waitForQuestion = () => {
      return new Promise((resolve) => {
        const storedQuestion = localStorage.getItem('question');
        if (storedQuestion) {
          resolve(JSON.parse(storedQuestion));
          return;
        }
        
        const handler = (message: any) => {
          const data = JSON.parse(message.data);
          if (data.hasOwnProperty('question')) {
            const question = data.question as Question;
            localStorage.setItem('question', JSON.stringify(question));
            resolve(question);
            window.location.reload();
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

      if (data.type === 'language') {
        console.log(data);
        setOppLang(data.language);
      }

      if (data.hasOwnProperty('timeLeft')) {
        setTimeLeft(data.timeLeft);
      }

      waitForQuestion().then((question) => {
        setRandomQuestion(question as Question);
      });

      if (data.type === 'requestEndSession') {
        if (data.reason === 'disconnect') {
          // Handle end session due to disconnect
          setIsDisconnectPopupOpen(true);
        } else {
          setUserConfirmedEnd(true);
        }
      }

      if (data.type === 'requestRedirect') {
        setUserConfirmedRedirect(true);
      }

      if (data.type === 'cancelled') {
        setUserConfirmedEnd(false);
      }

      if (data.type === 'cancelledRedirect') {
        setUserConfirmedRedirect(false);
      }


      if (data.type === 'END_SESSION') {
        setIsEnded(true);
        handleEndSession();
      }

      if (data.type === 'REDIRECTED') {
        setIsRedirect2nd(true);
        handleRedirectSession();
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

  useEffect(() => {
    // Function to send language to the server
    const sendLanguageToServer = async (lang: string) => {
      const message = JSON.stringify({
        type: 'language',
        userId: userId,
        language: lang,
      });
      ws?.send(message);
    };

    sendLanguageToServer(language);

  }, [language]); 

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

  const handleRedirectClick = () => {
    onConfirmRedirectPopupOpen();
  };


  const handleConfirmRedirect2nd = () => {
    onConfirmRedirectPopupOpen();
    onWaiting2ndOpen();
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'REQUEST_REDIRECT',
        userId: userId,
        confirmEnd: userConfirmedRedirect,
      });
      ws.send(message);
    }
    handleEvaluateAndCompile();
  }

  const handleCancelWait2nd = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'cancelRedirect',
        userId: userId,
      });
      ws.send(message);
    }
  };


  useEffect(() => {
    if (isEndingSessionPopupOpen) {
      const timeout = setTimeout(() => {
        localStorage.removeItem('timerExpired');
        localStorage.removeItem('endTime');
        localStorage.removeItem('question');
        router.push('/dashboard');
        setIsEndingSessionPopupOpen(false);
      }, redirectTime);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isEndingSessionPopupOpen, router]);

  useEffect(() => {
    if (isRedirectTo2ndPopupOpen) {
      const timeout = setTimeout(() => {
        localStorage.removeItem('endTime');
        localStorage.setItem('timerExpired', 'true');
        setisTimeUp(true);
      }, redirectTime);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isRedirectTo2ndPopupOpen]);

  const handleEndSession = () => {
    localStorage.removeItem('endTime');
    localStorage.removeItem('timerExpired');
    localStorage.removeItem('saved');
    localStorage.removeItem('question');
    setIsEndingSessionPopupOpen(true);
  };

  const handleRedirectSession = () => {
    setIsRedirectTo2ndPopupOpen(true);
  };

  const handleTimeUp = async (timeIsUp: boolean) => {
    if (timeIsUp) {
      setisTimeUp(true);
    }
  };


  const handleCompileAndSwitchTabs = async () => {
    setSelectedTab('Executed Code');
    await handleCompile()
  }

  const handleCompile = async () => {
    setIsExecuteButtonDisabled(true);
    setIsLoading(true);
    try {
      const selectedLanguageId = languageIds[language];
      const editorValue = writeEditorValue;
      console.log("Editor value:", editorValue);

      const url = process.env.NODE_ENV === 'production' ? "34.123.40.181:30300" : 'localhost:7000'; 
      
      console.log("eval url: " + url);

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
      setIsExecuteButtonDisabled(false);
    }
  };

  const handleEvaluate = async () => {
    setIsEvaluateLoading(true);

    try {
      const editorValue = writeEditorValue;
      const questionData = randomQuestion;

      const url = process.env.NODE_ENV === 'production' ? "34.123.40.181:30300" : 'localhost:7000'; 

      console.log("eval url: " + url);

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
      setIsEvaluateLoading(false);
      setIsModalOpen(true);
    }
  };

  const handleEvaluateAndCompile = async () => {
    setSelectedTab('Question')
    await handleCompile(); // First, compile the code
    await handleEvaluate(); // Then, evaluate the code

    const score = parseScoreFromEvaluationResult(
      localStorage.getItem(`evaluationResult_${userId}`) ?? ''
    );
  
    const outcome = 0;
    const sessionIdString = Array.isArray(sessionId) ? sessionId[0] : sessionId;
    const feedback = localStorage.getItem(`evaluationResult_${userId}`) || '';
    const historyData: HistoryData = {
      userId: userId,
      questionId: randomQuestion?.id || 0,
      difficulty: randomQuestion?.difficulty || 'Easy',
      sessionId: String(sessionIdString),
      raceOutcome: outcome,
      score: score,
      attemptDate: new Date(),
      submission: writeEditorValue,
      feedback: feedback,
      language: language,
    };
    console.log('history data :', historyData);
    sendHistoryData(historyData);
  };


  interface HistoryData {
    userId: string;
    sessionId: string;
    questionId: number;
    raceOutcome: number;
    score: number;
    attemptDate: Date;
    submission: string;
    feedback: string;
    language: string;
    difficulty: string;
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

      const url = process.env.NODE_ENV === 'production' ? "34.123.40.181:30500" : 'localhost:8006'; 

      console.log("history url: " + url);

      const response = await fetch(`http://${url}/history`, {
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
    language: oppLang,
    setLanguage,
    readEditorValue,
    setReadEditorValue,
    allowed,
    sessionId,
    isTimeUp,
    description,
    userId,
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
  ];

  return isTimeUp ? (
    <div className="h-screen grid grid-cols-12 w-full p-4">
      <div className="h-full col-span-3 flex flex-col overflow-y-hidden">
        <Tabs
          aria-label="Dynamic tabs"
          items={tabs}
          variant="underlined"
          selectedKey={selectedTab}
          defaultSelectedKey={'Question'}
          // @ts-ignore
          onSelectionChange={setSelectedTab}
        >
          <Tab key="Question" title="Question">
            <div className="flex flex-col px-2 h-full">
              <p className="text-xl font-bold ">
                {randomQuestion?.id}. {randomQuestion?.title}
                <Chip
                  className="capitalize ml-2 mb-1"
                  color={
                    difficultyColorMap[
                      randomQuestion?.difficulty as string
                    ]
                  }
                  size="sm"
                  variant="flat"
                >
                  {randomQuestion?.difficulty}
                </Chip>
              </p>
              <p className="font-light mb-5">
                Categories: {randomQuestion?.categories.join(', ')}
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
        </Tabs>
      </div>
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
          isRedirectMessage={false}
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
          isRedirectMessage={false}
        />
        <RedirectPopup
          isOpen={isEndingSessionPopupOpen}
          message={
            'You are being redirected back to the dashboard... it may take a few seconds~'
          }
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
                    {isEvaluateLoading ? (
                      <div>
                        <span className="loading loading-bars loading-xs"></span>
                        <p>Evaluating...</p>
                      </div>
                    ) : (
                      <p className="max-h-40 overflow-y-auto">
                        {localStorage.getItem(`evaluationResult_${userId}`)
                          ? localStorage.getItem(`evaluationResult_${userId}`)
                          : 'Your code has not been evaluated! Did you manage to attempt the question? If so, please discuss with your opponent! If not, please contact LeetcodeRacer Admins @goodluck.com. Thank you and have a nice day I hope you liked Leetcode Racer :D'}
                      </p>
                    )}
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
    <div className="h-screen grid grid-cols-12 w-full  p-4">
      <div className="h-full col-span-3 flex flex-col overflow-y-hidden">
        {/* <div className="h-full w-full flex flex-col flex-grow"> */}
        <Tabs
          aria-label="Dynamic tabs"
          items={tabs}
          variant="underlined"
          selectedKey={selectedTab}
          defaultSelectedKey={'Question'}
          // @ts-ignore
          onSelectionChange={setSelectedTab}
        >
          <Tab key="Question" title="Question">
            <div className="flex flex-col px-2 h-full">
              <p className="text-xl font-bold ">
                {randomQuestion?.id}. {randomQuestion?.title}
                <Chip
                  className="capitalize ml-2 mb-1"
                  color={
                    difficultyColorMap[
                      randomQuestion?.difficulty as string
                    ]
                  }
                  size="sm"
                  variant="flat"
                >
                  {randomQuestion?.difficulty}
                </Chip>
              </p>
              <p className="font-light mb-5">
                Categories: {randomQuestion?.categories.join(', ')}
              </p>

              <div className="flex flex-col flex-grow h-[calc(100vh-175px)] overflow-y-auto">
                <div
                  dangerouslySetInnerHTML={{ __html: description as string }}
                />
              </div>
            </div>
          </Tab>
          <Tab key="Executed Code" title="Executed Code">
            <Card>
              <CardBody>
                {isLoading ? (
                  <div>
                    <span className="loading loading-bars loading-xs"></span>
                    <p>Compiling....</p>
                  </div>
                ) : (
                  compileResult ? (
                    compileResult
                  ) : (
                    'Your Code has not been evaluated.'
                  )
                )}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>

      <div className="col-span-9 place-items-center pl-5 h-full overflow-hidden w-full pr-4">
        <div className="grid grid-cols-12 w-full h-4/5">
          <div className="col-span-6 flex justify-between h-full w-full">
            <LeftPanel {...leftPanelProps} />
          </div>
          <div className="col-span-6 flex justify-between h-full w-full">
            <div
              className={`${isTimeUp ? 'items-start' : 'w-full flex-1 ml-2 mt-2 h-full '
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
        <RedirectPopup
          isOpen={isEndingSessionPopupOpen}
          message={
            'You are being redirected to the dashboard.. it may take a few seconds~'
          }
        />
        </div>
        {/* <CompileEvaluation {...CompileEvaluationProps} /> */}
        <div className="pt-16">
          <div className="flex w-full items-center justify-center">
            <div className="flex justify-between w-full">
              <Button
                color="primary"
                variant="ghost"
                onClick={handleCompileAndSwitchTabs}
                className="mr-2"
                disabled={isExecuteButtonDisabled}
              >
                Execute Code
              </Button>
              <Button
                color="success"
                variant="ghost"
                onClick={handleRedirectClick}
              >
                I&apos;m Ready!
              </Button>
            </div>
          </div>
        </div>
        <RedirectPopup
          isOpen={isRedirectTo2ndPopupOpen}
          message={
            'You are being redirected to the chat room.. it may take a few seconds~'
          }
        />
        <ConfirmEndPopup
          isOpen={isConfirmRedirectPopupOpen}
          onOpenChange={onConfirmRedirectPopupChange}
          onConfirm={handleConfirmRedirect2nd}
          isRedirectMessage={true}
        />
        <WaitingPopup
          isOpen={isWaiting2ndPopupOpen}
          onOpenChange={onWaiting2ndChange}
          onCancel={handleCancelWait2nd}
          isEnded={isRedirect2nd}
          isRedirectMessage={true}
        />
      </div>
    </div>
  );
};

export default CollaborationSession;
