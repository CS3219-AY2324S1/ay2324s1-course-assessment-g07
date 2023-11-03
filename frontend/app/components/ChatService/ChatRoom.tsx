import React, { useState, useRef, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import ChatMessage from './ChatMessage';
import { Input, Button } from '@nextui-org/react';

interface ChatRoomProps {
  docRef: any;
  userId: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ docRef, userId }) => {
  const db = getFirestore();
  const messageSpanRef = useRef<HTMLElement | null>(null);
  const messagesRef = collection(db, 'matched-tokens', docRef.id, 'messages');
  const [formValue, setFormValue] = useState('');

  const messagesQuery = query(
    collection(db, 'matched-tokens', docRef?.id, 'messages'),
    orderBy('createdAt')
  );

  const [messages] = useCollectionData(messagesQuery);

  useEffect(() => {
    // Scroll to the latest message when messages change
    messageSpanRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: any) => {
    e.preventDefault();

    setFormValue('');
    try {
      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        userId,
      });
      console.log('Document has been written into Database');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className="">
        {messages &&
          messages.map((message, index) => (
            <ChatMessage key={index} message={message} userId={userId} />
          ))}
        <span ref={messageSpanRef} />
      </div>

      <div>
        <form className="flex h-10vh w-full mt-4" onSubmit={sendMessage}>
          {/* <input
          className="w-full text-white text-base bg-gray-400 outline-none border-none px-4 placeholder-white"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="What was your approach in solving this question"
        /> */}
          {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4"></div> */}
          <Input
            type="Message"
            placeholder="Message"
            size={'lg'}
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          {/* <button
          className=" border-none text-white p-4 text-2xl cursor-pointer"
          type="submit"
          disabled={!formValue}
        >
          
        </button> */}
          <Button
            isIconOnly
            color="primary"
            variant="ghost"
            size="lg"
            type="submit"
          >
            🕊️
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
