import React from "react";
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
    Tooltip
} from "@nextui-org/react";
import AceEditor from "react-ace";

import 'ace-builds/src-noconflict/theme-nord_dark';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-java';
import { WinIcon, DrawIcon, LoseIcon, CodeIcon } from './HistoryIcons'

const HistoryTable = () => {
  type ChipColor = 'success' | 'danger' | 'warning' | 'default';
  const difficultyColorMap: { [key: string]: ChipColor } = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'danger',
  };
  const [histories, setHistories] = React.useState<History[]>([]);
  const [codeSubmission, setCodeSubmission] = React.useState("");
  const [feedback, setFeedback] = React.useState("");
  // const difficultyColorMap : { [key: string]: string } = {'Easy':'success', 'Medium' : 'warning', 'Hard': 'danger'};
    // 0 for draw, 1 for win, 2 for lose
  const outcomeOptions = ["Draw", "Win", "Loss"];
  const outcomeColors: { [key: number]: ChipColor } = {
    1: 'success',
    0: 'default',
    2: 'danger',
  };
  const indicators = [<div key="draw"><DrawIcon/></div>, <div key="win"><WinIcon/></div>, <div key="lose"><LoseIcon/></div>];

  async function getHistories(userId : string): Promise<History[]> {
    const res: Response = await fetch(`http://localhost:8006/history?userId=${userId}`, {
      method: 'GET',
      headers: { token: localStorage.token },
      cache: 'no-store',
    });
    console.log(res);
    const histories: History[] = await res.json();
    return histories;
  }
  

  React.useEffect(() => {
    console.log(localStorage.userid);
    const fetchHistories = async () => {
      const fetchedHistories: History[] = await getHistories(localStorage.userid);
      setHistories(fetchedHistories);
      console.log(histories)
  
    };
    fetchHistories();

  }, []);



  const processNewLine = (text:string) => {
    const formattedText = text.replace(/\\n/g, '\n');
    return formattedText.split('\n');
  }
  
  const daysPast = (date : string) => {
      const oneDay = 24 * 60 * 60 * 1000; 
      const diffDays = Math.round(Math.abs((new Date().getTime() - new Date(date).getTime()) / oneDay));
      return diffDays;
  };
  
  const generateDaysSubtitle = (attemptedDate : string) => {
      const daysDifference = daysPast(attemptedDate);
      if (daysDifference <= 1) {
        return `Attempted today`;
      } else if (daysDifference == 1) {
        return `Attempted 1 day ago`;
      }
      return `Attempted ${daysDifference} days ago`;
  };

  const parseDateString = (date : string) => {

    const originalDate = new Date(date);
    const month = originalDate.getUTCMonth() + 1; 
    const day = originalDate.getUTCDate();
    const year = originalDate.getUTCFullYear();

    const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

    return formattedDate; 

  }

  return (
    <div>
        <h1 className="ml-2 title-font sm:text-lg mb-4 font-bold">History</h1>
        <Accordion variant="splitted" disabledKeys={["empty"]}>
        {histories.length > 0 ? (histories.map((record : any, index : any) => (
            <AccordionItem 
              key={index} 
              aria-label={record.questionId} 
              // indicator={indicators[record.raceOutcome]}
              hideIndicator={true}
              startContent={
                <div className="flex justify-center items-center w-20">
                  <Chip
                    className="capitalize flex m-2"
                    color={difficultyColorMap[record.difficulty ? record.difficulty : 'Easy']}
                    size="md"
                    variant="flat"
                  >
                    {record.difficulty ? record.difficulty : 'Easy'}
                  </Chip>
                </div>
                 
              }
              title={`Question ${record.questionId}`}
              subtitle={
                <div className="col-span-2 grid grid-cols-2 gap-0">
                  <p>{parseDateString(record.attemptDate)}</p>
                  <p className="justify-self-end">{record.language}</p>
                </div>}
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    height: "auto",
                    transition: {
                      height: {
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 1,
                      },
                      opacity: {
                        easings: "ease",
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
                        easings: "ease",
                        duration: 0.25,
                      },
                      opacity: {
                        easings: "ease",
                        duration: 0.3,
                      },
                    },
                  },
                },
              }}
            >
              <div className="flex flex-wrap h-5 items-center text-small justify-center w-full h-full">
                <div className="col-span-2 grid grid-cols-2 gap-0 " id="cardContainer">
                  <Card className="flex flex-wrap w-full" radius="none" shadow="none">
                    <CardHeader className="flex">
                      <div className="col-span-2 grid grid-cols-2 gap-0 w-full items-center">
                        <p className="text-xl text-default-700 font-bold m-2">Your Code</p>
                        <div className="justify-self-end">
                          <Tooltip 
                            key={record.raceOutcome} 
                            color={outcomeColors[record.raceOutcome]} 
                            content={outcomeOptions[record.raceOutcome]} 
                            showArrow={true}
                            className="capitalize">
                            {indicators[record.raceOutcome]}
                          </Tooltip>
                        </div>
                      </div>
                    </CardHeader>

                    <CardBody className="flex w-full">
                      <AceEditor
                        mode={record.language}
                        theme="tomorrow_night"
                        name={`Editor`}
                        value={`${record.submission.replace(/\\n/g, '\n')}`}
                        readOnly={ true }
                        style={{ 
                          width: '440px', 
                          // width: '95%', 
                          height: "500px",
                          // height: "200%",
                          fontSize: '20px',
                          margin: '5px'
                        }}                         
                      />

                    </CardBody>
                  </Card>
                  <Card className="flex flex-wrap w-full" radius="none" shadow="none">
                    <CardHeader className="flex gap-3">
                      <div className="col-span-2 grid grid-cols-2 gap-0 w-full items-center">
                        <p className="text-xl text-default-700 font-bold m-2">Feedback</p>
                        <div className="justify-self-end">
                          <Chip 
                            key='score' 
                            variant='dot'
                            radius='sm'
                            color='success'
                            className="capitalize">
                              <p className="font-bold">{record.score}/10</p>
                          </Chip>
                        </div>
                      </div>
                    </CardHeader>
                    {/* <Divider/> */}
                    <CardBody>
                      {processNewLine(record.feedback).map((line) => (
                        <p key={line} className="text-medium">{line}</p>
                      ))}
                    </CardBody>
                  </Card>
                </div>
              </div>

            </AccordionItem>)
        )) : (<AccordionItem 
              key={"empty"} 
              aria-labelledby={`empty-item`}
              title={`No History`}
              subtitle={"Attempt a question first and comeback later"}>
          </AccordionItem>
        )}
        </Accordion>
    </div>
  );
}

export default HistoryTable;
