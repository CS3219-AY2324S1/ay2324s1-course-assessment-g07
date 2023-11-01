import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from 'react';
import ChatRoom from './ChatRoom';
import Loading from './Loading';

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
    const [userId, setUserId] = useState("");

    useEffect(() => {
        // call backend to initialise firebase
        const fetchFirebaseConfig = async () => {
            const jwtToken = localStorage.getItem('token');
            const chatServiceURL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_CHAT_SERVICE_URL_PROD : process.env.NEXT_PUBLIC_CHAT_SERVICE_URL_DEV;

            try {
                const response = await fetch(`${chatServiceURL}/firebase-config`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    }
                })

                if (response.status === 200) {
                    const data = await response.json();
                    initializeApp(data.firebaseConfig);
                    
                    const db = getFirestore();
                    await setDoc(doc(db, "matched-tokens", matchToken), {
                        matchToken: matchToken,
                        createdAt: serverTimestamp()
                    })
                        .then(() => {
                            console.log("Document successfully written!");
                            setDocRef(doc(db, "matched-tokens", matchToken));
                        })
                        .catch(error => { console.error("Error adding document: ", error); });
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchFirebaseConfig();
        const userId = localStorage.getItem("userid");
        if (userId != null) {
            setUserId(userId);
        }
    }, []);

    const renderChatComponent = () => {
        return (
            <main className="flex flex-grow flex-col overflow-y-auto bg-gray-700 w-full h-[calc(100vh-300px)] pt-5">
                <section className="mt-auto flex flex-col justify-center">
                    {(userId && (docRef)) ? <ChatRoom docRef={docRef} userId={userId} /> : <Loading />}
                </section>
            </main>
        )
    }

    return (
        renderChatComponent()
    )
}

export default ChatComponent;