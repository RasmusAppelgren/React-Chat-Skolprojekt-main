import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth-context"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config"




function Activechats({ openActiveChat }) {
    const { currentUser } = useContext(AuthContext);
    const [activeChat, setActiveChat] = useState([]);


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            doc.exists() && setActiveChat(doc.data().chat);
        });
        return () => {
            unSub();
        }
    }, [currentUser.uid]);

    const ClickHandler = (m) => {
        console.log("ACTIVECHATS" + m.chatId)
        openActiveChat(m.chatId)

    }

    return (
        <>
            <p>Active Chats</p>

            {activeChat.map((m) => (
                <p onClick={() => ClickHandler(m)}>{m.member}</p>

            ))}



        </>


    )
}

export default Activechats;
