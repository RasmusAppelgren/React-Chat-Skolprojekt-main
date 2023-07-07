import React, { useState } from "react";
import { auth, provider } from '../firebase-config'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";



function SignIn() {
    const auth = getAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Inloggning lyckades")
                const user = userCredential.user;

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                setError(errorCode)
            })
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input required type="email" placeholder="Email" />
                <input required type="password" placeholder="Lösenord" />
                <button>Logga in</button>
                <p>
                    Saknar du konto?<Link to="/Register">Registrera</Link>
                </p>
                {error && <span>{error}</span>}
            </form>
        </>


    )
}

export default SignIn
