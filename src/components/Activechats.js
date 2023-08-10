import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth-context"
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase-config"
import Chats from "./Chats";



function Activechats() {
    const { currentUser } = useContext(AuthContext);
    const [activeChat, setActiveChat] = useState([]);


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            doc.exists() && setActiveChat(doc.data().chat);
            console.log("ACTIVE CHATS " + doc.data().chat)
        });
        return () => {
            unSub();
        }
    }, [currentUser.uid]);





    console.log(activeChat)


    return (
        <>
            <p>Active Chats</p>

            {activeChat.map((m) => (
                <Chats data={m} key={m.id} />
            ))}



        </>


    )
}

export default Activechats;
