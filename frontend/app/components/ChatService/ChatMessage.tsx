import React from 'react';
import { Chip, Textarea } from '@nextui-org/react';

interface ChatMessageProps {
  userId: string;
  message: any;
  key: number;
}

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const currUserId = props.userId;
  const { text, userId } = props.message;

  const messageClass = userId === currUserId ? 'sent' : 'received';

  return (
    <div
      className={`message flex ${
        messageClass === 'sent' ? 'flex-row-reverse' : ''
      }`}
    >
      <p className={`max-w-full mb-2 py-2 px-4 rounded-lg ${
        messageClass === 'sent'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-black'
      }`}
      >
        {text}
      </p>
      {/* <div className="">
        {messageClass === 'sent' ? (
          // <Chip color="primary" variant="shadow">
          //   {text}
          // </Chip>
          <Textarea
            labelPlacement="outside"
            placeholder="Enter your description"
            defaultValue={text}
            className="max-w-xs"
            size="lg"
          />
        ) : (
          // <Chip color="secondary" variant="shadow">
          //   {text}
          // </Chip>

          <Textarea
            labelPlacement="outside"
            placeholder="Enter your description"
            defaultValue={text}
            className="max-w-xs"
            size="lg"
          />
        )}
      </div> */}
    </div>
  );
};

export default ChatMessage;
