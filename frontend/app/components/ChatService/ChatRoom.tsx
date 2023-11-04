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

    if (!formValue.trim()) {
      return;
    }

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
    <div>
      <div className="h-90 flex flex-col overflow-y-auto">
        {messages &&
          messages.map((message, index) => (
            <ChatMessage key={index} message={message} userId={userId} />
          ))}
        <span ref={messageSpanRef} />
      </div>

      <div>
        <form className="flex h-10vh w-full mt-4 pb-2" onSubmit={sendMessage}>
          <Input
            type="Message"
            placeholder="Message"
            size={'lg'}
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
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
