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
                // Lägga till användare i users i DB

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

            <div className="d-flex align-items-center justify-content-center appBackground" style={{ minHeight: '100vh' }}>
                <div className="shadow bg-white rounded w-75 ">
                    <div className="container">
                        <div className="row p-2">
                            <img src="/logo.png" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row p-2">
                                <input required type="email" placeholder="Email" className="border-0" />
                            </div>
                            <div className="row p-2">
                                <input required type="password" placeholder="Lösenord" className="border-0" />
                            </div>
                            <div className="row p-2">
                                <button className="btn btn-light">Logga in</button>
                            </div>
                            <div className="row p-2">
                                <p className="text-center">
                                    Saknar du konto? <Link to="/Register" className="link-info text-decoration-none">Registrera</Link>
                                </p>
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
}

export default SignIn
