import React from "react";

interface ChatMessageProps {
  userId : string;
  message: any;
  key: number;
}

const ChatMessage: React.FC<ChatMessageProps> = (props) =>{
    const currUserId = props.userId;
    const { text, userId } = props.message;
  
    const messageClass = userId === currUserId ? 'sent' : 'received';
    
    return (
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    )
}

export default ChatMessage;