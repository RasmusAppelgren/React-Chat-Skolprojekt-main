import React from 'react';
import { auth, provider } from '../firebase-config'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import Search from './Search';



function Dashboard() {
    const auth = getAuth();
    function SignOut() {
        console.log("Loggar ut")
        signOut(auth)
    }
    onAuthStateChanged(auth, (user) => {
        console.log(user)
    })
    return (
        <>
            <p>DASHBOARD</p>
            <Search />
            <button onClick={SignOut}>Logga ut</button>

        </>


    )
}

export default Dashboard;
