import React, { useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, serverTimestamp, setDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase-config"
import { useContext } from "react";
import { AuthContext } from "../context/Auth-context"
import Chat from './Chat';



function Search() {
  const [user, setUser] = useState('')
  const usersRef = collection(db, "users");
  const { currentUser } = useContext(AuthContext)
  const [chatStatus, setChatStatus] = useState(false)
  const [chatID, setChatID] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchQ = e.target[0].value;
    const q = query(usersRef, where("displayName", "==", searchQ));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const foundMatch = doc.data()
      setUser(foundMatch)
      console.log(foundMatch.displayName)
    });
  }
  const openChat = async () => {
    console.log("function openChat")
    console.log("SELECTED USER ID " + user.uid)
    console.log("CURRENT ID " + currentUser.uid)
    const chatID = currentUser.uid < user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid


    console.log(chatID)
    setChatID(chatID)
    const res = await getDoc(doc(db, "chats", chatID));
    if (!res.exists()) {
      console.log("OPEN CHAT")
      await setDoc(doc(db, "chats", chatID), { messages: [] });
      console.log("Collection created")
      setChatStatus(true)
    } else {
      console.log("Chat found")
      setChatStatus(true)

    }
  }
  return (
    <>
      <p>Sökfunktionen</p>
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="Användarnamn" />
        <button>Sök</button>
      </form>
      {user && (
        <span onClick={openChat}>{user.displayName}</span>
      )}
      {chatStatus && (
        <Chat chatID={chatID} />
      )}

    </>


  )
}

export default Search;
