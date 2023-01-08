import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(Object.keys(data.user).length);
  return (
    <div className="chat">
      {Object.keys(data.user).length === 0 && (
        <div>Choose a user from your chat section or search for a user :)</div>
      )}

      {Object.keys(data.user).length !== 0 && (
        <div className="chatInfo">
          <div className="container">
            <img src={data.user?.photoURL} />
            <span>{data.user?.displayName}</span>
          </div>
          {/* <div className="chatIcons">
                    <img src={Cam} />
                    <img src={Add} />
                    <img src={More} />
                </div> */}
        </div>
      )}
      {Object.keys(data.user).length !== 0 && <Messages />}
      {Object.keys(data.user).length !== 0 && <Input />}
    </div>
  );
};

export default Chat;
