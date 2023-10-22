import React from 'react';
import LanguageSelector from './LanguageSelect';  // Assuming the relative path. Adjust as needed.
import QuestionDropdown from './QuestionDropdown';  // Assuming the relative path. Adjust as needed.
import CollabEditor from './CollabEditor';

type PanelProps = {
    sideJoined: "left" | "right" | null,
    language: string,
    setLanguage: (language: string) => void,
    leftEditorValue?: string,
    setLeftEditorValue?: (value: string) => void,
    rightEditorValue?: string,
    setRightEditorValue?: (value: string) => void,
    handleJoin: (side: "left" | "right") => void,
    buttonsState: { left?: boolean, right?: boolean },
    allowed: boolean,
    sessionId: string | string[],
    isTimeUp: boolean
};

export const LeftPanel: React.FC<PanelProps> = ({
    sideJoined, language, setLanguage,
    leftEditorValue, setLeftEditorValue,
    handleJoin, buttonsState, allowed, sessionId, isTimeUp
}) => {
    return (
        <div className={`flex-1 mr-2 mt-0 flex flex-col ${isTimeUp ? 'items-start' : ''}`}>
        {!isTimeUp && sideJoined === "left" &&
                <LanguageSelector language={language} setLanguage={setLanguage} />
            }
            {!isTimeUp && sideJoined === "right" &&
                <QuestionDropdown />
            }
            <CollabEditor
                side="left"
                sideJoined={sideJoined}
                editorValue={leftEditorValue || " "}
                setEditorValue={setLeftEditorValue}
                onJoin={handleJoin}
                disabled={!buttonsState.left || !allowed || sideJoined === 'right'}
                buttonState={buttonsState.left}
                language={language}
                sessionId={sessionId}
            />
        </div>
    );
}

export const RightPanel: React.FC<PanelProps> = ({
    sideJoined, language, setLanguage,
    rightEditorValue, setRightEditorValue,
    handleJoin, buttonsState, allowed, sessionId, isTimeUp
}) => {
    return (
        <div className={`flex-1 ml-2  ${isTimeUp ? 'items-start' : ''}`}>
        {!isTimeUp && sideJoined === "right" &&
                <LanguageSelector language={language} setLanguage={setLanguage} />
            }
            {!isTimeUp && sideJoined === "left" &&
                <QuestionDropdown />
            }
            <CollabEditor
                side="right"
                sideJoined={sideJoined}
                editorValue={rightEditorValue || " "}
                setEditorValue={setRightEditorValue}
                onJoin={handleJoin}
                disabled={!buttonsState.right || !allowed || sideJoined === 'left'}
                buttonState={buttonsState.right}
                language={language}
                sessionId={sessionId}
            />
        </div>
    );
}

