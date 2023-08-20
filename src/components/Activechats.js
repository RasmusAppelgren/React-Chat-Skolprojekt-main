import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth-context"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config"




function Activechats({ openActiveChat }) {
    const { currentUser } = useContext(AuthContext);
    const [activeChat, setActiveChat] = useState([]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            const res = doc.data().chat
            setActiveChat(res)

        });
        return () => {
            unSub();
        }
    }, [currentUser.uid]);



    const ClickHandler = (m) => {
        openActiveChat(m.chatId)

    }
    if (!activeChat) {
        return (
            <div className="row">
                <div className="col">
                    <p>Inga konversationer</p>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            {activeChat.map(d => (<>
                                <div className="col">
                                    <p className="border-bottomç" key={d.chatId} onClick={() => ClickHandler(d)}>{d.member}</p>
                                    <hr class="hr" />
                                </div>
                            </>))}
                        </div>
                    </div>
                </div>
            </>


        )

    }


}

export default Activechats;
