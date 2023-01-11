import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Message from './Message'

const Messages = () => {
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
            data.chatId !== "null" ? doc.exists() && setMessages(doc.data().messages) : setMessages([])
        })

        return () =>{
            unSub()
        }
    },[data.chatId])

    return (
        <div className="messages">
            {messages.map(m=>(
                <Message message={m} key={m.id}/>
            ))}
        </div>
    )
}

export default Messages
