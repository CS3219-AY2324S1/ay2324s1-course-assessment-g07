import React from 'react';
import {
  Accordion,
  AccordionItem,
  Card,
  CardHeader,
  CardBody,
  Chip,
  Divider,
  Table,
  TableBody,
  TableHeader,
  TableCell,
  TableRow,
  TableColumn,
  Textarea,
  Tooltip,
} from '@nextui-org/react';
import AceEditor from 'react-ace';
import { Question } from '@/app/questions/page';

import 'ace-builds/src-noconflict/theme-nord_dark';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-java';
import { WinIcon, DrawIcon, LoseIcon, CodeIcon } from './HistoryIcons';

const HistoryTable = () => {
  type ChipColor = 'success' | 'danger' | 'warning' | 'default';
  const difficultyColorMap: { [key: string]: ChipColor } = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'danger',
  };
  const [histories, setHistories] = React.useState<History[]>([]);
  const [codeSubmission, setCodeSubmission] = React.useState('');
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [feedback, setFeedback] = React.useState('');
  // const difficultyColorMap : { [key: string]: string } = {'Easy':'success', 'Medium' : 'warning', 'Hard': 'danger'};
  // 0 for draw, 1 for win, 2 for lose
  const outcomeOptions = ['Draw', 'Win', 'Loss'];
  const outcomeColors: { [key: number]: ChipColor } = {
    1: 'success',
    0: 'default',
    2: 'danger',
  };
  const indicators = [
    <div key="draw">
      <DrawIcon />
    </div>,
    <div key="win">
      <WinIcon />
    </div>,
    <div key="lose">
      <LoseIcon />
    </div>,
  ];

  async function getHistories(userId: string): Promise<History[]> {

    const historyUrl = process.env.NODE_ENV === 'production' ? "34.123.40.181:30500" : 'localhost:8006';

    console.log("history url: " + historyUrl);


    const res: Response = await fetch(`http://${historyUrl}/history?userId=${userId}`, {
      method: 'GET',
      headers: { token: localStorage.token },
      cache: 'no-store',
    }
    );
    console.log(res);
    const histories: History[] = await res.json();
    return histories;
  }

  async function getTickets(): Promise<Question[][]> {

    const url = process.env.NODE_ENV === 'production' ? "34.123.40.181:30700" : 'localhost:8001';

    console.log('question url: ' + url);

    const res: Response = await fetch(`http://${url}/questions`, {
      method: 'GET',
      headers: { token: localStorage.token },
      cache: 'no-store',
    });
    const questions: Question[][] = await res.json();
    return questions;
  }


  React.useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const fetchedQuestions: Question[][] = await getTickets();
      const key: any = 'questions';
      setQuestions(fetchedQuestions[key]);
      setIsLoading(false);
      // console.log(fetchedQuestions[key]);
      // console.log(questions);
    };
    fetchQuestions();
  }, []);

  React.useEffect(() => {
    console.log(localStorage.userid);
    const fetchHistories = async () => {
      const fetchedHistories: History[] = await getHistories(
        localStorage.userid
      );
      setHistories(fetchedHistories);
      console.log(histories);
    };
    fetchHistories();
  }, []);

  const processNewLine = (text: string) => {
    const formattedText = text.replace(/\\n/g, '\n');
    return formattedText.split('\n');
  };

  const daysPast = (date: string) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      Math.abs((new Date().getTime() - new Date(date).getTime()) / oneDay)
    );
    return diffDays;
  };

  const getQuestionName = (questionId: number) : string => {
    const question = questions.find((q) => q.id == questionId);
    if (question) {
      return question.title;
    } else {
      return "Unknown Question";
    }
  }

  const generateDaysSubtitle = (attemptedDate: string) => {
    const daysDifference = daysPast(attemptedDate);
    if (daysDifference <= 1) {
      return `Attempted today`;
    } else if (daysDifference == 1) {
      return `Attempted 1 day ago`;
    }
    return `Attempted ${daysDifference} days ago`;
  };

  const parseDateString = (date: string) => {
    const originalDate = new Date(date);
    const month = originalDate.getUTCMonth() + 1;
    const day = originalDate.getUTCDate();
    const year = originalDate.getUTCFullYear();

    const formattedDate = `${month.toString().padStart(2, '0')}/${day
      .toString()
      .padStart(2, '0')}/${year}`;

    return formattedDate;
  };

  return (
    <div className="pr-10">
      <h1 className="ml-2 title-font sm:text-lg mb-4 font-bold pl-2">
        History
      </h1>
      <Accordion variant="splitted" disabledKeys={['empty']}>
        {histories.length > 0 ? (
          histories.map((record: any, index: any) => (
            <AccordionItem
              key={index}
              aria-label={record.questionId}
              // indicator={indicators[record.raceOutcome]}
              hideIndicator={true}
              startContent={
                <div className="flex justify-center items-center w-20">
                  <Chip
                    className="capitalize flex m-2"
                    color={
                      difficultyColorMap[
                      record.difficulty ? record.difficulty : 'Easy'
                      ]
                    }
                    size="md"
                    variant="flat"
                  >
                    {record.difficulty ? record.difficulty : 'Easy'}
                  </Chip>
                </div>
              }
              title={`${record.questionId}. ${getQuestionName(record.questionId)}`}
              subtitle={
                <div className="col-span-2 grid grid-cols-2 gap-0">
                  <p>{parseDateString(record.attemptDate)}</p>
                  <p className="justify-self-end">{record.language}</p>
                </div>
              }
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    height: 'auto',
                    transition: {
                      height: {
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        duration: 1,
                      },
                      opacity: {
                        easings: 'ease',
                        duration: 1,
                      },
                    },
                  },
                  exit: {
                    y: -10,
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: {
                        easings: 'ease',
                        duration: 0.25,
                      },
                      opacity: {
                        easings: 'ease',
                        duration: 0.3,
                      },
                    },
                  },
                },
              }}
            >
              <div className="flex flex-wrap h-5 items-center text-small justify-center w-full h-full">
                <div
                  className="w-full grid grid-cols-12 gap-0 "
                  id="cardContainer"
                >
                  <Card
                    className="col-span-8 flex flex-wrap w-full"
                    radius="none"
                    shadow="none"
                  >
                    <CardHeader className="flex">
                      <span className="text-xl text-default-700 font-bold">
                        Your Code
                        
                      </span>
                      <span className="ml-auto justify-self-end">
                        <Tooltip
                          key={record.raceOutcome}
                          color={outcomeColors[record.raceOutcome]}
                          content={outcomeOptions[record.raceOutcome]}
                          showArrow={true}
                          className="capitalize"
                        >
                          {indicators[record.raceOutcome]}
                        </Tooltip>
                      </span>
                    </CardHeader>

                    <CardBody className="pt-0 flex w-full" style={{marginLeft: -6}}>
                      <AceEditor
                        mode={record.language}
                        theme="tomorrow_night"
                        name={`Editor`}
                        value={`${record.submission.replace(/\\n/g, '\n')}`}
                        readOnly={true}
                        style={{
                          width: '600px',
                          // width: '95%',
                          height: '350px',
                          // height: "200%",
                          fontSize: '20px',
                          padding: '0px',
                        }}
                      />
                    </CardBody>
                  </Card>
                  <Card
                    className="col-span-4 flex flex-wrap w-full"
                    radius="none"
                    shadow="none"
                  >
                    <CardHeader className="flex gap-3">
                      {/* <div className="grid gap-0 w-full items-center"> */}
                        <span className="text-xl text-default-700 font-bold">
                          Feedback
                        </span>
                        <span className="ml-auto justify-self-end">
                          <Chip
                            key="score"
                            variant="dot"
                            radius="sm"
                            color="success"
                            className="capitalize"
                          >
                            <p className="font-bold">{record.score}/10</p>
                          </Chip>
                        </span>
                      {/* </div> */}
                    </CardHeader>
                    {/* <Divider/> */}
                    <CardBody className='pt-0 h-5 overflow-y-scroll'>
                      {processNewLine(record.feedback).map((line) => (
                        <p key={line} className="text-medium">
                          {line}
                        </p>
                      ))}
                    </CardBody>
                  </Card>
                </div>
              </div>
            </AccordionItem>
          ))
        ) : (
          <AccordionItem
            key={'empty'}
            aria-labelledby={`empty-item`}
            title={`No History`}
            subtitle={'Attempt a question first and comeback later'}
          ></AccordionItem>
        )}
      </Accordion>
    </div>
  );
};

export default HistoryTable;