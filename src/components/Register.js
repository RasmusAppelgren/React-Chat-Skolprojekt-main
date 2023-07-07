import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
    const auth = getAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode)
            });

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder="Användarnamn" />
                <input required type="email" placeholder="Email" />
                <input required type="password" placeholder="Lösenord" />
                <button>Sign up</button>
                <p>
                    Har du redan ett konto?<Link to="/Signin">Logga in</Link>
                </p>
                {error && <span>{error}</span>}
            </form>



        </>
    )
};

export default Register;