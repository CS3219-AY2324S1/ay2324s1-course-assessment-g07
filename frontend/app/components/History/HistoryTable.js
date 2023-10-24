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
    ModalHeader 
} from "@nextui-org/react";
import { WinIcon, DrawIcon, LoseIcon } from './HistoryIcons'

const HistoryTable = () => {
    // 0 for draw, 1 for win, 2 for lose
    const outcomeOptions = ["Draw", "Win", "Lose"];
    const indicators = [<DrawIcon/>, <WinIcon/>, <LoseIcon/>];
    const defaultContent = [
        {
            questionId: 1,
            sessionId: "123456",
            score: 90,
            raceOutcome:1,
            feedback: "good attempt",
            submission: "const a = 1 + 1;",
            attemptedDate: new Date(2023, 10, 10)
        },
        {
            questionId: 2,
            sessionId: "123457",
            score: 10,
            raceOutcome:2,
            feedback: "Wrong Answer",
            submission: "const a = 2 + 2;",
            attemptedDate: new Date(2023, 10, 20)
        },
        {
            questionId: 3,
            sessionId: "123458",
            score: 50,
            raceOutcome:0,
            feedback: "Partially correct",
            submission: "const a = 1 + 4;",
            attemptedDate: new Date(2023, 10, 16)
        }
    ];

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
    

    const getColor = (outcome) => {
        if (outcome == 0) {
            return "default";
        } else if (outcome == 1) {
            return "warning";
        } else {
            return "danger"
        }
    }

    const daysPast = (date) => {
        const oneDay = 24 * 60 * 60 * 1000; 
        const diffDays = Math.round(Math.abs((new Date() - date) / oneDay));
        return diffDays;
    };
    
    const generateDaysSubtitle = (attemptedDate) => {
        const daysDifference = daysPast(attemptedDate);
        return `Attempted ${daysDifference} days ago`;
    };

  return (
    <div>
        <Accordion variant="light">
        {defaultContent.map((record, index) => (
            <AccordionItem 
                key={index} 
                aria-label={record.questionId} 
                indicator={indicators[record.raceOutcome]}
                title={`Question ${record.questionId}`}
                subtitle={generateDaysSubtitle(record.attemptedDate)}>
                    <div className="max-w-md">
                        <div className="flex h-5 items-center space-x-4 text-small justify-center w-full h-full">
     
                            <Tooltip 
                                key="success" 
                                color="success" 
                                content={record.score} 
                                showArrow={true} 
                                className="capitalize">
                                <Button variant="ghost" color="success" className="capitalize">
                                    Score
                                </Button>
                            </Tooltip>
                            <Divider orientation="vertical" />

                            <Tooltip 
                                key={getColor(record.raceOutcome)} 
                                color={getColor(record.raceOutcome)} 
                                content={outcomeOptions[record.raceOutcome]} 
                                showArrow={true} 
                                className="capitalize">
                                <Button variant="ghost" color="default" className="capitalize">
                                    Race Outcome
                                </Button>
                            </Tooltip>
                            <Divider orientation="vertical" />
                            <Button variant="ghost" color="default" className="capitalize" onClick={onOpenQuestionModal}>
                                Question
                            </Button>

                            <Divider orientation="vertical" />

                            <Button variant="ghost" color="default" className="capitalize" onClick={onOpenSubmissionModal}>
                                Submission
                            </Button>


                        </div>
                    </div>
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
