import { getAuth, signOut } from "firebase/auth";
import Search from './Search';
import Activechats from './Activechats';
import React, { useState, useContext } from 'react';
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase-config"
import { AuthContext } from "../context/Auth-context"
import Chat from "./Chat";
import { ArrowLeft } from 'react-bootstrap-icons';


function Dashboard() {
    const [user, setUser] = useState('')
    const { currentUser } = useContext(AuthContext)
    const [chatStatus, setChatStatus] = useState(false)
    const [chatID, setChatID] = useState('')
    const auth = getAuth();

    function SignOut() {
        console.log("Loggar ut")
        signOut(auth)
    }
    const handleToggle = () => {
        setChatStatus((current) => !current);
    };

    const openChat = async (user) => {
        const chatID = currentUser.uid < user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        setChatID(chatID)
        setUser(user)
        const res = await getDoc(doc(db, "chats", chatID));
        if (!res.exists()) {
            console.log("Create new chat and userChats")
            await setDoc(doc(db, "chats", chatID), { messages: [] });
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                chat: arrayUnion({
                    chatId: chatID,
                    member: user.displayName
                })
            })
            await updateDoc(doc(db, "userChats", user.uid), {
                chat: arrayUnion({
                    chatId: chatID,
                    member: currentUser.displayName
                })
            })
            setChatStatus(true)
        } else {
            setChatStatus(true)

        }
    }
    const openActiveChat = async (id) => {
        setChatID(id)
        setChatStatus(true)
    }


    if (chatStatus) {
        return (
            <>
                <nav className="bg-light sticky-top">
                    <div className="container-fluid">
                        <i onClick={handleToggle}>
                            <ArrowLeft color="royalblue" size={40} />
                        </i>

                    </div>
                </nav>
                <Chat chatID={chatID} handleToggle={handleToggle} />
            </>
        )

    } else {
        return (
            <>
                <nav className="navbar">
                    <div className="container-fluid">
                        <img src="/logo.png" className="img-fluid mx-auto" />
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Search openChat={openChat} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Activechats openActiveChat={openActiveChat} />
                        </div>
                    </div>
                </div>

                <div className="fixed-bottom bg-light">
                    <div className="row">
                        <div className="col text-center pt-3 pb-3">
                            <button onClick={SignOut} className="btn btn-outline-info btn-sm">Logga ut</button>
                        </div>
                    </div>
                </div>

            </>
        )
    }


}

export default Dashboard;
