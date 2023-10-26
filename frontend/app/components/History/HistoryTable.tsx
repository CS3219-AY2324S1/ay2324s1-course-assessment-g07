import React from "react";
import {
    Accordion, 
    AccordionItem,
    Divider, 
    Tooltip, 
    Button, 
    useDisclosure, 
    Modal, 
    ModalContent,
    ModalBody, 
    ModalFooter, 
    ModalHeader,
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
    // 0 for draw, 1 for win, 2 for lose
  const outcomeOptions = ["Draw", "Win", "Lose"];
  const indicators = [<div key="draw"><DrawIcon/></div>, <div key="win"><WinIcon/></div>, <div key="lose"><LoseIcon/></div>];
  const defaultContent = [
      {
          "userId": "700679b4-e0cc-4bac-849a-13ffc82eda82",
          "questionId": 1,
          "sessionId": "123456",
          "score": 90,
          "raceOutcome":1,
          "feedback": "good attempt",
          "submission": "const a = 1 + 1;",
          "attemptedDate": "2023-10-24T12:00:00Z"
      },        
      {
          "userId": "700679b4-e0cc-4bac-849a-13ffc82eda82",
          "questionId": 2,
          "sessionId": "223456",
          "score": 10,
          "raceOutcome":0,
          "feedback": "wrong ans",
          "submission": "const a = 1 + 1;",
          "attemptedDate": "2023-10-14T12:00:00Z"
      },        
      {
          "userId": "700679b4-e0cc-4bac-849a-13ffc82eda82",
          "questionId": 2,
          "sessionId": "223456",
          "score": 10,
          "raceOutcome":0,
          "feedback": "wrong ans",
          "submission": "const a = 1 + 1;",
          "attemptedDate": "2023-10-4T12:00:00Z"
      },
  
  ];

  async function getHistories(userId : string): Promise<History[]> {
    const res: Response = await fetch(`http://localhost:8006/history/${userId}`, {
      method: 'GET',
      headers: { token: localStorage.token },
      cache: 'no-store',
    });
    const histories: History[] = await res.json();
    return histories;
  }

  React.useEffect(() => {
    console.log(localStorage.userid);
    const fetchHistories = async () => {
      const fetchedHistories: History[] = await getHistories(localStorage.userid);
      // const key: any = 'history';
      setHistories(fetchedHistories);
      // console.log(histories);
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
  

  const getColor = (outcome : Number) => {
      if (outcome == 0) {
          return "default";
      } else if (outcome == 1) {
          return "warning";
      } else {
          return "danger"
      }
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
        <Accordion variant="light">
        {histories.map((record : any, index : any) => (
            <AccordionItem 
                key={index} 
                // aria-label={record.questionId} 
                indicator={indicators[record.raceOutcome]}
                title={`Question ${record.questionId}`}
                subtitle={generateDaysSubtitle(record.attemptedDate)}>
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
                                <TableCell>{parseDateString(record.attemptedDate)}</TableCell>
                                <TableCell>
                                  <Button variant="ghost" color="success" className="capitalize" isIconOnly onClick={onOpenSubmissionModal}>
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
              <ModalHeader className="flex flex-col gap-1">
                Submission
              </ModalHeader>
              <ModalBody>

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
