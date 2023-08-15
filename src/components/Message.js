import { AuthContext } from "../context/Auth-context"
import React, { useContext, useEffect, useRef } from "react";


function Message(props) {
    const { currentUser } = useContext(AuthContext);
    console.log("DITT UID" + props.message.senderId)
    console.log(currentUser.uid)
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [props.message]);

    return (
        <>
            <div className="container-fluid" ref={ref}>
                {props.message.senderId == currentUser.uid && (
                    <div class="d-flex justify-content-end">
                        <div className='p-3 mb-2 bg-success text-white rounded-3 d-inline-flefloat-left shadow'>
                            <span className='align-middle'>{props.message.text}</span>
                        </div>
                    </div>

                )}
                {props.message.senderId != currentUser.uid && (
                    <div class="d-flex justify-content-start">
                        <div className='p-3 mb-2 bg-primary text-white rounded-3 d-inline-fle float-right shadow'>
                            <span className='align-middle'>{props.message.text}</span>
                        </div>
                    </div>
                )}
            </div>


        </>
    )

}

export default Message