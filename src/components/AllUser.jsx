import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, getDocs, query } from "firebase/firestore";

const AllUser = () => {

    const [allUsers, setAllUsers] = useState([]);

    const handleSearch = async () => {
      const q = query(
        collection(db, "users"),
      );
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
      } catch (err) {

      }
    };

    // useEffect(() => {
    //     const q = query(
    //       collection(db, "users"),
    //     );

    //     try{
    //         const querySnapshot
    //         (async () => {
    //             querySnapshot = await getDocs(q);
    //         })
    //         querySnapshot.forEach((doc) => {
    //             getUsers.push({
    //                 ...doc.data()
    //             })
    //         });
    //         setAllUsers(getUsers);
    //     }
    //     catch(err){

    //     }

    // },[])

    useEffect(()=>{
        handleSearch();
    },[])

    return (
      <div>
        {allUsers.map((user) => (
          <div key={user.key}>{user.displayName}</div>
        ))}
      </div>
    );
}

export default AllUser
