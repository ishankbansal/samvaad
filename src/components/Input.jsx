import React, { useContext, useEffect, useState } from 'react'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {

    const [xtext, setText] = useState("");
    const [img, setImg] = useState("");

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    
    const handleSend = async() => {
        const text = xtext.slice();
        setText("");
        if(img){
            const storageRef = ref(storage, uuid());
            
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on('state_changed', 
                // (error) => {
                //     console.log(error);
                //     setErr(true)
                //     console.log("error1");
                // }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId),{
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderID: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            })
                        })
                    });
                }
            );
        }
        else{
            await updateDoc(doc(db, "chats", data.chatId),{
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderID: currentUser.uid,
                    date: Timestamp.now(),
                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid),{
            [data.chatId+".lastMessage"]:{
                text
            },
            [data.chatId+".date"]: serverTimestamp()
        })
        await updateDoc(doc(db, "userChats", data.user.uid),{
            [data.chatId+".lastMessage"]:{
                text
            },
            [data.chatId+".date"]: serverTimestamp()
        })
        
        // console.log(text);
        setImg(null);
    }

    useEffect(() => {
        const keyDownHandler = (event) => {
          
            if (event.key === 'Enter') {
                event.preventDefault();
                document.querySelector(".send-button").click();
            }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      }, []);    

    return (
        <div className="input">
            <input 
                type="text" 
                placeholder="Type Something..." 
                onChange={e=>setText(e.target.value)}
                value={xtext}
            />
            <div className="send">
                <img src={Attach}/>
                <input type="file" style={{display: "none"}} id = "file" onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor = "file">
                    <img src={Img} />
                </label>
                <button 
                disabled={!xtext || xtext.trim().length === 0}
                className="send-button"
                onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input
