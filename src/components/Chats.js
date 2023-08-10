import React from 'react'


function Chats(props) {
    console.log("FROM CHATS" + props.data.member)
    return (
        <>
            <p>{props.data.member}</p>
        </>
    )
}

export default Chats