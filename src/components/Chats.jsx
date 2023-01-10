import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = async () => {
      const unsub = await onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setChats(Object.entries(doc.data()));
        }
      );

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleRemove = (event, key) => {
    event.stopPropagation();
    setChats(
      chats.filter((item) => {
        return item[0] != key;
      })
    );
    dispatch({ type: "REMOVE_USER" });
  };

  return (
    <div className="chats">
      {chats
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              {currentUser.uid === chat[1].userInfo.uid && <span>(you)</span>}
              <p className="lastMessage">{chat[1].lastMessage?.text}</p>
            </div>
            <span className="cross" onClick={(e) => handleRemove(e, chat[0])}>
              X
            </span>
          </div>
        ))}
    </div>
  );
};

export default Chats;
