import React from 'react';

interface ChatComponentProps {
    sessionId : string | string[];
    usersInfo : any;
}

const ChatComponent : React.FC<ChatComponentProps> = (props : any) => {
    const {sessionId, usersInfo} = props;
    console.log(sessionId);
    console.log(usersInfo);

    const renderChatComponent = () => {
        return (
            <div>
                <h1>ChatComponent</h1>
            </div>
        )
    }

    return (
        renderChatComponent()
    )
}

export default ChatComponent;