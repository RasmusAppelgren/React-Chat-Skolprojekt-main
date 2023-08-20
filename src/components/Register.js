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
                await setDoc(doc(db, "userChats", currentUser.uid), {
                    chatId: "", member: ""
                });
                navigate('/Dashboard')


            })
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode)
            });
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-center appBackground" style={{ minHeight: '100vh' }}>
                <div className="shadow bg-white rounded w-75 ">
                    <div className="container">
                        <div className="row p-2">
                            <img src="/logo.png" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row p-2">
                                <input required type="text" placeholder="Användarnamn" className="border-0" />
                            </div>
                            <div className="row p-2">
                                <input required type="email" placeholder="Email" className="border-0" />
                            </div>
                            <div className="row p-2">
                                <input required type="password" placeholder="Lösenord" className="border-0" />
                            </div>
                            <div className="row p-2">
                                <button className="btn btn-light">Registrera</button>
                            </div>
                            {error &&
                                <div className="row p-2">
                                    <span>{error}</span>
                                </div>
                            }
                        </form>
                    </div>

                </div >
            </div>




        </>
    )
};

export default Register;