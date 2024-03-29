import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("Add an Avatar");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(file);

    if (!file) {
      console.log(file, "empty");
      toast.error("Please add your avatar!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        console.log("exe");
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log("exe1");
        const storageRef = ref(storage, displayName);
        console.log("exe2");

        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log("exe3");

        uploadTask.on(
          "state_changed",
          // (error) => {
          //     console.log(error);
          //     setErr(true)
          //     console.log("error1");
          // },
          () => {
            console.log("exe4");
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
              }
            );
          }
        );
      } catch (err) {
        setErr(true);
        console.log("error2");
      }
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">samवाद</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" required />
          <input type="email" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              setFileName("Avatar Uploaded!");
            }}
          />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>{fileName}</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have a account? <Link to="/login">Login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
