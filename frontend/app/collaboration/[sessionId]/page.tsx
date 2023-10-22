'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Timer from '@/app/components/Collaboration/Timer';
import {LeftPanel, RightPanel} from '@/app/components/Collaboration/Panels';
import axios from 'axios';
import CompileEvaluation from '@/app/components/Collaboration/CompileEvaluation';


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

  
  const questionDescription = {
    id: 1,
    title: "Reconstruct Itinerary",
    difficulty: "Hard",
    categories: ["Depth-First Search", "Graph", "Eulerian Circuit"],
    description: `
      <p>You are given a list of airline <code>tickets</code> where <code>tickets[i] = [from<sub>i</sub>, to<sub>i</sub>]</code> represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.</p>
      <p>All of the tickets belong to a man who departs from <code>"JFK"</code>, thus, the itinerary must begin with <code>"JFK"</code>. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.</p>
      <ul>
        <li>For example, the itinerary <code>["JFK", "LGA"]</code> has a smaller lexical order than <code>["JFK", "LGB"]</code>.</li>
      </ul>
      <p>You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.</p>
      <p>&nbsp;</p>
      <strong class="example">Example 1:</strong>
      <img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/itinerary1-graph.jpg" style="width: 382px; height: 222px;">
      <pre><strong>Input:</strong> tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
      <strong>Output:</strong> ["JFK","MUC","LHR","SFO","SJC"]
      </pre>
      <strong class="example">Example 2:</strong>
      <img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/itinerary2-graph.jpg" style="width: 222px; height: 230px;">
      <pre><strong>Input:</strong> tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
      <strong>Output:</strong> ["JFK","ATL","JFK","SFO","ATL","SFO"]
      <strong>Explanation:</strong> Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.
      </pre>
      <p>&nbsp;</p>
      <strong>Constraints:</strong>
      <ul>
        <li><code>1 &lt;= tickets.length &lt;= 300</code></li>
        <li><code>tickets[i].length == 2</code></li>
        <li><code>from<sub>i</sub>.length == 3</code></li>
        <li><code>to<sub>i</sub>.length == 3</code></li>
        <li><code>from<sub>i</sub></code> and <code>to<sub>i</sub></code> consist of uppercase English letters.</li>
        <li><code>from<sub>i</sub> != to<sub>i</sub></code></li>
      </ul>
    `,
    question_link: "https://leetcode.com/problems/reconstruct-itinerary/?envType=daily-question&envId=2023-09-14",
    solution_link: "https://leetcode.com/problems/reconstruct-itinerary/?envType=daily-question&envId=2023-09-14/solutions",
  };


  const languageIds: Record<string, number> = {
    javascript: 63,
    python: 71,
    java: 81,
    csharp: 17,
  };

  useEffect(() => {
    const storedLeftEditorValue = localStorage.getItem('leftEditorValue') || '';
    const storedRightEditorValue = localStorage.getItem('rightEditorValue') || '';
    setLeftEditorValue(storedLeftEditorValue);
    setRightEditorValue(storedRightEditorValue);

  }, []);


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
    };

    websocket.onclose = () => {
      console.log('WebSocket is closed');
    };

    setWs(websocket);
  }, [sessionId]);

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

  const handleTimeUp = async (timeIsUp: boolean) => {
    if (timeIsUp) {
      console.log('Time is up!');
      //set flag
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
    } catch (error) {
      console.error('Error executing code:', error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleEvaluate = async () => {
    setIsLoading(true);

    try {
      const editorValue = sideJoined == "left" ? leftEditorValue : rightEditorValue;
      const response = await axios.post(
        'http://localhost:7000/evaluate', // Replace with your eval-service host
        {
          code: editorValue,
          language: language,
          description: questionDescription.description,
          compilationResult: compileResult,
        }
      );

      const evaluationResult = response.data.result;
      setEvaluationResult(evaluationResult);
      console.log('Evaluation Result:', evaluationResult);
    } catch (error) {
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height: '700px' }}>
      <LeftPanel
        sideJoined={sideJoined}
        language={language}
        setLanguage={setLanguage}
        leftEditorValue={leftEditorValue}
        setLeftEditorValue={setLeftEditorValue}
        handleJoin={handleJoin}
        buttonsState={buttonsState}
        allowed={allowed}
        sessionId={sessionId}
      />
      <CompileEvaluation
        handleCompile={handleCompile}
        handleEvaluateAndCompile={handleEvaluateAndCompile} 
        isLoading={isLoading}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        compileResult={compileResult} 
        evaluationResult={evaluationResult} 
      />
      <Timer duration={timeLeft} onTimeUp={handleTimeUp} />
      <RightPanel
        sideJoined={sideJoined}
        language={language}
        setLanguage={setLanguage}
        rightEditorValue={rightEditorValue}
        setRightEditorValue={setRightEditorValue}
        handleJoin={handleJoin}
        buttonsState={buttonsState}
        allowed={allowed}
        sessionId={sessionId}
      />
    </div>
  );
};

export default CollaborationSession;