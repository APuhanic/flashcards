import { getFirestore, collection, setDoc, doc, getDocs, addDoc } from "firebase/firestore"
import app from "./firebase"

const db = getFirestore(app)

var deckRef;

export function setUserDBref(userID) {
  deckRef = collection(db, "users", userID, "decks");
}

export function clearuserDBref() {
  deckRef = null;
}

export async function getDeck(deckID) {
  if (deckRef) {
    const userDecks = []
    const snapshot = await getDocs(deckRef)
    snapshot.forEach((doc) => {
      const data = doc.data();
      userDecks.push({ "id": doc.id, "deckName": data.deckName })
    })
    return userDecks
  }
}

export async function addDeck(NewDeckName) {
  if (deckRef) {
    const docRef = doc(deckRef, NewDeckName)
    const ref = await setDoc(docRef, {
      deckName: NewDeckName
    })
    console.log("Document written with ID: ", ref);
  }
}

export async function addCard(deckName, answer, question) {
  if (deckRef) {
    const docRef = collection(deckRef, deckName, "cards")
    const newdocReF = await addDoc(docRef, {
      answer: answer,
      question: question
    })
    console.log("Document written with ID: ", newdocReF.id);
  }
}

export async function getCards(deckID) {
  if (deckRef) {
    const userCards = [];
    const cardRef = collection(deckRef, deckID, "cards")
    const snapshot = await getDocs(cardRef)
    snapshot.forEach((doc) => {
      const data = doc.data()
      userCards.push({ "id": doc.id, "answer": data.answer, "question": data.question })

    })
    return userCards
  }
}
