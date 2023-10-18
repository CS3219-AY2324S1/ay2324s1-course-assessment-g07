import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
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

    console.log(sessionId);

    const [docRef, setDocRef] = useState({});
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
            <div className="text-center max-w-screen-md mx-auto">
                <section>
                    {(userId && docRef) ? <ChatRoom docRef={docRef} userId={userId}/> : <Loading />}
                </section>
            </div>
        )
    }

    return (
        renderChatComponent()
    )
}

export default ChatComponent;