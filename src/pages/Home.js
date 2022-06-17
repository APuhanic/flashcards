import React from 'react'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from "../contexts/authContext";

import { getFirestore, collection, setDoc, doc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore"
import app from '../firebase/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";


const db = getFirestore(app)

export default function Home() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const { currentUser } = useAuth();


  useEffect(() => {

    if (currentUser) {
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getUsers();
    }
  }, []);

  return (
    <>
      <div className='Home'>Home</div>
      {users && users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name: {user.name}</h1>
          </div>
        );
      })}
    </>
  )

}
