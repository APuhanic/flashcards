
import { async } from "@firebase/util";
import { getFirestore, collection, setDoc, doc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore"
import app from "./firebase"

const db = getFirestore(app)

var usersRef;

export function setUserDBref(userID) {
    usersRef = collection(db, "users", userID, "decks");
    console.log((usersRef.id))
}

export function clearuserDBref() {
    usersRef = null;
}

export async function getDeck(){
    if(usersRef){
        const docRef=doc(usersRef,"DpRwIqXgoGild0o20qSZ")
        const snapshot=await getDoc(docRef)
        if(snapshot.exists()){
            console.log(snapshot)

            return snapshot.data();
        }
    }
}



