import React, { useState, useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import ChatMessage from './ChatMessage';

interface ChatRoomProps {
  docRef: any;
  userId: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ docRef, userId }) => {

  const db = getFirestore();
  const dummy = useRef<HTMLSpanElement | null>(null);
  const messagesRef = collection(db, 'matched-tokens', docRef.id, 'messages');
  const [formValue, setFormValue] = useState('');

  const messagesQuery = query(
    collection(db, 'matched-tokens', docRef.id, 'messages'),
    orderBy("createdAt")
  );

  const [messages] = useCollectionData(messagesQuery);

  const sendMessage = async (e: any) => {
    e.preventDefault();

    setFormValue('');
    try {
      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        userId
      })
      console.log("Document has been written into Database");
      dummy.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <main>
        {messages && messages.map((message, index) => <ChatMessage key={index} message={message} userId={userId} />)}
        <span ref={dummy}/>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="How did your coding session go?" />
        <button type="submit" disabled={!formValue}>🕊️</button>
      </form>
    </div>
  )
}

export default ChatRoom;