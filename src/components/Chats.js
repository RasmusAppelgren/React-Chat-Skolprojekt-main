import React from 'react'


function Chats(props, { parentFunction }) {
    console.log("FROM CHATS" + props.data.chatId)

    const ClickHandler = () => {
        parentFunction(props.data.uid);
    }
    return (
        <>
            <p onClick={ClickHandler}>{props.data.member}</p>
            <p>{props.data.chatId}</p>
        </>
    )
}

export default Chats