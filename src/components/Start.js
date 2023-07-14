import React, { useState } from "react";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

const Start = () => {
    console.log(auth)
    return (
        <>
            <p>START</p>
            <button onClick={() => signOut(auth)}>Logga ut!</button>
        </>
    )
};

export default Start;