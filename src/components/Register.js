import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config"


const Register = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                /*
                Användare skapas i Firebase. Sedan skapas tabellen "users" så
                vi kan ha koll på vilka användare (användarnamn, mail och unikt id) 
                som har registrerat sig. 
                */
                await updateProfile(auth.currentUser, { displayName: displayName }).catch(
                    (err) => console.log(err)
                );
                const currentUser = userCredential.user;
                await setDoc(doc(db, "users", currentUser.uid), {
                    displayName,
                    email,
                    uid: currentUser.uid
                });
                await setDoc(doc(db, "userChats", currentUser.uid), { chatId: "", member: "" });
                navigate('/Dashboard')


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
                <button>Skapa konto</button>
                <p>
                    Har du redan ett konto?<Link to="/Signin">Logga in</Link>
                </p>
                {error && <span>{error}</span>}
            </form>



        </>
    )
};

export default Register;