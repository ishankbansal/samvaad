import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const AllUser = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"));
    const getUsers = [];

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        getUsers.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setAllUsers(getUsers);
    } catch (err) {}
  };

  const handleSelect = async () => {
    // check whether the group(chats in firestore) exists, if not then create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    user && handleSelect();
    if (user === false) {
      props.onChange(false);
    }
  }, [user]);

  return (
    <div className="user-list" /*onMouseOver={hover}*/>
      {allUsers.map((u) => (
        <div key={u.key} className="userChat" onClick={() => setUser(u)}>
          <img src={u.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{u.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUser;
