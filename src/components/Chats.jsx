import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';

const Chats = () => {

    const [chats, setChats] = useState([]);

    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });        

            return () => {
                unsub();
            }
        }

        currentUser.uid && getChats();
    },[currentUser.uid])

    console.log(Object.entries(chats));

    return (
        <div className="chats">
            <div className="userChat">
                <img src="https://i0.wp.com/calmatters.org/wp-content/uploads/2022/05/Senior-Grads-Zintan-CJN-CM-02.jpg?fit=1200%2C800&ssl=1" alt=""/>
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img src="https://i0.wp.com/calmatters.org/wp-content/uploads/2022/05/Senior-Grads-Zintan-CJN-CM-02.jpg?fit=1200%2C800&ssl=1" alt=""/>
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img src="https://i0.wp.com/calmatters.org/wp-content/uploads/2022/05/Senior-Grads-Zintan-CJN-CM-02.jpg?fit=1200%2C800&ssl=1" alt=""/>
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}

export default Chats
