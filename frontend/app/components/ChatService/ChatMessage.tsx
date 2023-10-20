import React from "react";

interface ChatMessageProps {
  userId : string;
  message: any;
  key: number;
}

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const currUserId = props.userId;
  const { text, userId } = props.message;

  const messageClass = userId === currUserId ? 'sent' : 'received';

  return (
    <div className={`message flex ${messageClass === 'sent' ? 'flex-row-reverse' : ''}`}>
      <p className={`max-w-md mb-2 py-2 px-4 rounded-lg ${
        messageClass === 'sent'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-black'
      }`}
      >
        {text}
      </p>
    </div>
  );
};



export default ChatMessage;