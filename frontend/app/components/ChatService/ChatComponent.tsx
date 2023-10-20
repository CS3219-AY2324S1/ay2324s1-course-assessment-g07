import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from 'react';
import ChatRoom from './ChatRoom';
import Loading from './Loading';

/*
    Call this component to display chat component on screen
*/

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCy1wX5QxWFSPMDcvhxOe21CeJAn6HfBVQ",
    authDomain: "chat-app-e107d.firebaseapp.com",
    projectId: "chat-app-e107d",
    storageBucket: "chat-app-e107d.appspot.com",
    messagingSenderId: "911568968686",
    appId: "1:911568968686:web:5894bd5d9dcafa1f7e0cff"
};

// Initialize Firebase
initializeApp(firebaseConfig);

interface ChatComponentProps {
    sessionId: string | string[];
}

const ChatComponent: React.FC<ChatComponentProps> = (props: any) => {
    const { sessionId } = props;
    const matchToken = sessionId;

    const [docRef, setDocRef] = useState<Object | null>(null);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const db = getFirestore();

        const addData = async () => {
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
        addData();

        // get the current userid from the localstorage, which was set upon login
        const userId = localStorage.getItem("userid");
        if (userId != null) {
            setUserId(userId);
        }
    }, []);

    const renderChatComponent = () => {
        return (
            <main className="flex flex-grow flex-col overflow-y-scroll bg-gray-700 w-full h-[calc(100vh-560px)] pt-5">
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