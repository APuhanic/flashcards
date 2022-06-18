import React from 'react'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from "../contexts/authContext";
import { Button } from 'react-bootstrap';
import { getFirestore, collection, setDoc, doc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore"
import app from '../firebase/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getDeck } from '../firebase/firebasedb';
import { useParams } from 'react-router-dom';


const db = getFirestore(app)

export default function Home() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const { currentUser } = useAuth();
  const auth = getAuth();
  const userID = useParams();




  async function createUser() {
    try {
      setDoc(doc(db, "users", auth.currentUser.uid), {
        email: currentUser.email
      })

    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      
      getDeck(auth.currentUser.uid).then((res)=>{
        setUsers(res);
      })
    }
  }, []);



  return (
    <>
      <div className='Home'>Home</div>
      <Button variant="primary" onClick={createUser}>Primary</Button>

      <div>
        {" "}
        <h1>deck: {users.deckName}</h1>
      </div>

    </>
  )

}
