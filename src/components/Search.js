import React, { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config"



function Search() {
    const [user, setUser] = useState('')
    const usersRef = collection(db, "users");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchQ = e.target[0].value;
        const q = query(usersRef, where("displayName", "==", searchQ));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const foundMatch = doc.data()
            setUser(foundMatch.displayName)
        });
    }
    return (
        <>
            <p>Sökfunktionen</p>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder="Användarnamn" />
                <button>Sök</button>
            </form>
            {user && (
                <span>{user}</span>
            )}

        </>


    )
}

export default Search;
