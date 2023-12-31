import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import ChatRoom from './ChatRoom';
import Loading from './Loading';
import { Textarea } from '@nextui-org/react';
import { url } from 'inspector';

/*
    Call this component to display chat component on screen
*/

interface ChatComponentProps {
  sessionId: string | string[];
}

const ChatComponent: React.FC<ChatComponentProps> = (props: any) => {
  const { sessionId } = props;
  const matchToken = sessionId;

  const [docRef, setDocRef] = useState<Object | null>(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // call backend to initialise firebase
    const fetchFirebaseConfig = async () => {
      const jwtToken = localStorage.getItem('token');

      try {
        const chatServiceURL = process.env.NODE_ENV === "production" ? "34.123.40.181:30000" : "localhost:8003";

        console.log("chat url : " + chatServiceURL);

        const response = await fetch(`http://${chatServiceURL}/firebase-config`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          initializeApp(data.firebaseConfig);

          const db = getFirestore();
          await setDoc(doc(db, 'matched-tokens', matchToken), {
            matchToken: matchToken,
            createdAt: serverTimestamp(),
          })
            .then(() => {
              console.log('Document successfully written!');
              setDocRef(doc(db, 'matched-tokens', matchToken));
            })
            .catch((error) => {
              console.error('Error adding document: ', error);
            });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFirebaseConfig();
    const userId = localStorage.getItem('userid');
    if (userId != null) {
      setUserId(userId);
    }
  }, []);

  const renderChatComponent = () => {
    return (
      <div className="flex flex-grow flex-col w-full h-[calc(100vh-450px)] pt-5">
        <div className="mt-auto flex flex-col justify-center">
          {userId && docRef ? (
            <ChatRoom docRef={docRef} userId={userId} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    );
  };

  return renderChatComponent();
};

export default ChatComponent;
