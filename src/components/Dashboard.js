import React from 'react';
import { auth, provider } from '../firebase-config'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import SignOut from './SignOut';



function Dashboard() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    return (
        <>
            <p>DASHBOARD</p>
            <SignOut />
        </>


    )
}

export default Dashboard;
