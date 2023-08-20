import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase-config'
import Message from './Message'
import { onSnapshot, doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/Auth-context"
import { ArrowLeft } from 'react-bootstrap-icons';


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
            <div className='row gx-0'>
                <div className="col overflow-auto pb-5">
                    {messages.map((m) => (
                        <Message message={m} key={m.date} />
                    ))}
                </div>
            </div>
            <div className='row gx-0'>
                <div className='col pb-5'>

                </div>
            </div>
            <div className='row gx-0'>
                <div className="p-3 text-info" id="message">
                    <div className="input-group">
                        <input placeholder='Meddelande...' type="text" className="form-control text-info" aria-label="" aria-describedby="button-addon2" value={msg} onChange={(e) => setMsg(e.target.value)} />
                        <button onClick={send} className="btn btn-outline-info" type="button" id="button-addon2">Skicka</button>
                    </div>
                </div>
            </div>



        </>
    );
};

export default Chat;