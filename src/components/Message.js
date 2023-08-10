import React from 'react'


function Message(props) {

    return (
        <>
            <p>{props.message.text}</p>
            <p>{props.message.displayName}</p>
        </>
    )
}

export default Message