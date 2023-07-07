import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";



const SignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log("Utloggning lyckades")
    }).catch((error) => {
        console.log("Error - något gick fel")
    });
    return (
        <>
            <button onClick={signOut} />
        </>
    )
};

export default SignOut;