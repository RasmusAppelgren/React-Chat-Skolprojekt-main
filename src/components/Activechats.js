import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth-context"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config"




function Activechats({ openActiveChat }) {
    const { currentUser } = useContext(AuthContext);
    const [activeChat, setActiveChat] = useState([]);







    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            const res = doc.data().chat
            setActiveChat(res)

        });
        return () => {
            unSub();
        }
    }, [currentUser.uid]);



    const ClickHandler = (m) => {
        openActiveChat(m.chatId)

    }
    if (!activeChat) {
        return (
            <p>No active chats</p>
        )
    } else {
        return (
            <>
                <p>Active Chats</p>
                {activeChat.map(d => (<p key={d.chatId} onClick={() => ClickHandler(d)}>{d.member}</p>))}




            </>


        )

    }




}

export default Activechats;
