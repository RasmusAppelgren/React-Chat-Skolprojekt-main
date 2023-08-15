import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase-config'
import Message from './Message'
import { onSnapshot, doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/Auth-context"


const Chat = (props) => {
    const [msg, setMsg] = useState('');
    const { currentUser } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", props.chatID), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
            unSub();
        }
    }, [props.chatID]);

    const send = async (e) => {
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
            <div className="messages overflow-auto">
                {messages.map((m) => (
                    <Message message={m} key={m.date} />
                ))}
            </div>

            <footer className="sticky-bottom p-3 mb-2 bg-light text-dark">
                <div className="input-group mb-3">
                    <input placeholder='Meddelande...' type="text" className="form-control" aria-label="Sizing example input" aria-describedby="button-addon2" value={msg} onChange={(e) => setMsg(e.target.value)} />
                    <button onClick={send} className="btn btn-outline-secondary" type="button" id="button-addon2">Skicka</button>
                </div>
            </footer>
        </>
    );
};

export default Chat;