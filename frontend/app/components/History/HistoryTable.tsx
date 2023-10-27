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
    TableColumn
} from "@nextui-org/react";
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

  const {
      isOpen: isOpenSubmissionModal,
      onOpen: onOpenSubmissionModal,
      onOpenChange: onOpenChangeSubmissionModal,
  } = useDisclosure();

  const {
      isOpen: isOpenQuestionModal,
      onOpen: onOpenQuestionModal,
      onOpenChange: onOpenChangeQuestionModal,
  } = useDisclosure();
  
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
                subtitle={generateDaysSubtitle(record.attemptDate)}>
                    {/* <div className="max-w-md"> */}
                        <div className="flex flex-wrap h-5 items-center space-x-4 text-small justify-center w-full h-full">
                          <Table className="w-full" aria-label="Example static collection table">
                            <TableHeader>
                              <TableColumn>SCORE</TableColumn>
                              <TableColumn>RACE OUTCOME</TableColumn>
                              <TableColumn>ATTEMPTED DATE</TableColumn>
                              <TableColumn>SUBMISSION</TableColumn>

                            </TableHeader>
                            <TableBody>
                              <TableRow key="1">
                                <TableCell>{record.score}</TableCell>
                                <TableCell>{outcomeOptions[record.raceOutcome]}</TableCell>
                                <TableCell>{parseDateString(record.attemptDate)}</TableCell>
                                <TableCell>
                                  <Button 
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
                                  </Button>
                                </TableCell>

                              </TableRow>
                            </TableBody>
                          </Table>
                          <Divider orientation="vertical" />
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
        <Modal
            isOpen={isOpenSubmissionModal}
            onOpenChange={onOpenChangeSubmissionModal}
            size={'2xl'}
        >
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
              </ModalHeader> */}
              <ModalBody>
              <div className="flex flex-wrap gap-4 m-5">
                  <Tabs key='bordered' variant='bordered' aria-label="Tabs variants" className="flex w-full flex-wrap gap-4 items-center justify-center" >
                    <Tab key="code" title="CODE">
                      <Card className="grid h-20 card bg-base-500 rounded-box place-items-center">
                        <CardBody>
                          <Snippet color="default" symbol="">{codeSubmission}</Snippet>
                        </CardBody>
                      </Card>  
                    </Tab>
                    <Tab key="feedbacl" title="FEEDBACK">
                      <Card className="grid h-20 card bg-base-500 rounded-box place-items-center">
                        <CardBody>
                          <Snippet color="success" symbol="">{feedback}</Snippet>
                        </CardBody>
                      </Card> 
                    </Tab>
                  </Tabs>
              </div>
                {/* <div className="flex flex-wrap gap-4">

                  <Code color="success">{feedback}</Code>
                </div>  */}

              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
            isOpen={isOpenQuestionModal}
            onOpenChange={onOpenChangeQuestionModal}
            size={'2xl'}
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Question Details
              </ModalHeader>
              <ModalBody>

              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default HistoryTable;
