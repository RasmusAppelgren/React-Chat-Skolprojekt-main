import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth-context"
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase-config"
import Message from "./Message";



function Activechats() {
    const { currentUser } = useContext(AuthContext);
    const chatsRef = collection(db, currentUser.uid);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
            console.log(doc.data().chatId)
        });
        return () => {
            unSub();
        }
    }, [currentUser.uid]);








    return (
        <>
            <p>Active Chats</p>
            {messages && messages.map((m) => (
                <Message message={m} key={m.id} />

            ))}
        </>


    )
}

export default Activechats;
