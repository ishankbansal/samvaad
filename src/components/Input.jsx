import React, { useContext, useState } from 'react'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Input = () => {

    const [text, setText] = useState("");
    const [img, setImg] = useState("");

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const handleSend = async() => {
        if(img){

        }
        else{
            await updateDoc(doc(db, "chats", data.chatId),{
                messages: arrayUnion({
                    
                })
            })
        }
    }

    return (
        <div className="input">
            <input type="text" placeholder="Type Something..." onChange={e=>setText(e.target.value)}/>
            <div className="send">
                <img src={Attach}/>
                <input type="file" style={{display: "none"}} id = "file" onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor = "file">
                    <img src={Img} />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input
