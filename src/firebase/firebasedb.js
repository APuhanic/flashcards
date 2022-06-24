
import { async } from "@firebase/util";
import { getFirestore, collection, setDoc, doc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore"
import app from "./firebase"

const db = getFirestore(app)

var deckRef;

export function setUserDBref(userID) {
    deckRef = collection(db, "users", userID, "decks");
    console.log((deckRef.id))
    console.log((userID))
}

export function clearuserDBref() {
    deckRef = null;
}

export async function getDeck(deckID){
    if(deckRef){
        const userDecks=[]
        const snapshot=await getDocs(deckRef)
        snapshot.forEach((doc)=>{
            console.log('data:', doc.data());
            userDecks.push(doc.data())
        })
        return userDecks
    }
}

export async function addDeck(NewDeckName){
    if(deckRef){
        const docRef= await addDoc(deckRef, {
            deckName: NewDeckName
        })
        console.log("Document written with ID: ", docRef.id);
    }

}


