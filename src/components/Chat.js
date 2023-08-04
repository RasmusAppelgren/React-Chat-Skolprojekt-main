import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase-config'
import Message from './Message'
import { collection, query, limit, orderBy, onSnapshot, doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/Auth-context"

const Chat = (props) => {
    const [msg, setMsg] = useState('')
    const { currentUser } = useContext(AuthContext)
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", props.chatID), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
            unSub();
        }
    }, [props.chatID]);

    console.log(messages)

    const send = async (e) => {
        console.log("SEND MESSAGE")
        await updateDoc(doc(db, "chats", props.chatID), {
            messages: arrayUnion({
                text: msg,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                displayName: currentUser.displayName
            })
        })
        setMsg('');
    }
    return (
        <>
            <div>
                <input placeholder='Meddelande...' type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button onClick={send}>Skicka</button>
            </div>
            <div className="messages">
                {messages.map((m) => (
                    <Message message={m} key={m.id} />
                ))}
            </div>
        </>
    );
};

export default Chat;