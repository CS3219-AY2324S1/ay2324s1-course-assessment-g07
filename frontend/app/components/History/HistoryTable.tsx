import React from "react";
import {
    Accordion, 
    AccordionItem,
    Card,
    CardBody,
    Code,
    Divider, 
    Tooltip, 
    Button, 
    useDisclosure, 
    Modal, 
    ModalContent,
    ModalBody, 
    ModalFooter, 
    ModalHeader,
    Snippet,
    Tab,
    Tabs,
    Table,
    TableBody,
    TableHeader,
    TableCell,
    TableRow,
    TableColumn,
    Textarea
} from "@nextui-org/react";
import AceEditor from "react-ace";

import 'ace-builds/src-noconflict/theme-nord_dark';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-java';
import { WinIcon, DrawIcon, LoseIcon, CodeIcon } from './HistoryIcons'

const HistoryTable = () => {
  const [histories, setHistories] = React.useState<History[]>([]);
  const [codeSubmission, setCodeSubmission] = React.useState("");
  const [feedback, setFeedback] = React.useState("");
    // 0 for draw, 1 for win, 2 for lose
  const outcomeOptions = ["Draw", "Win", "Lose"];
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
        <Accordion variant="light" disabledKeys={["empty"]}>
        {histories.length > 0 ? (histories.map((record : any, index : any) => (
            <AccordionItem 
                key={index} 
                aria-label={record.questionId} 
                indicator={indicators[record.raceOutcome]}
                title={`Question ${record.questionId}`}
                subtitle={generateDaysSubtitle(record.attemptDate)}
              >
                    {/* <div className="max-w-md"> */}
                        <div className="flex flex-wrap h-5 items-center text-small justify-center w-full h-full">
                          <Table className="w-full" aria-label="Example static collection table" >
                            <TableHeader>
                              <TableColumn>SCORE</TableColumn>
                              <TableColumn>RACE OUTCOME</TableColumn>
                              <TableColumn>ATTEMPTED DATE</TableColumn>
                              <TableColumn>LANGUAGE</TableColumn>

                            </TableHeader>
                            <TableBody>
                              <TableRow key="1">
                                <TableCell>{record.score}</TableCell>
                                <TableCell>{outcomeOptions[record.raceOutcome]}</TableCell>
                                <TableCell>{parseDateString(record.attemptDate)}</TableCell>
                                <TableCell>
                                  {/* <Button 
                                    variant="ghost" 
                                    color="success" 
                                    className="capitalize" 
                                    isIconOnly 
                                    onClick={() => {
                                      onOpenSubmissionModal();
                                      setFeedback(record.feedback);
                                      setCodeSubmission(record.submission);
                                    }}>
                                    <CodeIcon />
                                  </Button> */}
                                  {record.language}
                                </TableCell>

                              </TableRow>
                            </TableBody>
                          </Table>
                          <Divider orientation="horizontal" className="m-5"/>
                          {/* <div className="flex flex-wrap gap-4"> */}
                            <Tabs key='bordered' variant='bordered' color="success" aria-label="Tabs variants" className="flex w-full flex-wrap gap-4 items-center justify-center" >
                              <Tab key="code" title="CODE" className="flex w-full flex-wrap gap-4 items-center justify-center">
                                <AceEditor
                                  mode={record.language}
                                  theme="nord_dark"
                                  name={`Editor`}
                                  value={`${record.submission.replace(/\\n/g, '\n')}`}
                                  readOnly={ true }
                                  style={{ 
                                    width: '900px', 
                                    height: "500px",
                                    fontSize: '20px',
                                    margin: '5px'
                                  }}
                                />

                              </Tab>
                              <Tab key="feedback" title="FEEDBACK" className="flex w-full flex-wrap items-center justify-center">
                                <Card className="flex w-full m-5">
                                  <CardBody>
                                    {processNewLine(record.feedback).map((line) => (
                                      <p>{line}</p>
                                    ))}
                                  </CardBody>
                                </Card>

                              </Tab>
                            </Tabs>
                        {/* </div> */}
                        </div>
                    {/* </div> */}
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
