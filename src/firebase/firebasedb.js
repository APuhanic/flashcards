import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

var deckRef;

export function setUserDBref(userID) {
  deckRef = collection(db, "users", userID, "decks");
}

export function clearuserDBref() {
  deckRef = null;
}

export async function getDeck(deckID) {
  if (deckRef) {
    const userDecks = [];
    const snapshot = await getDocs(deckRef);
    snapshot.forEach((doc) => {
      const data = doc.data();
      userDecks.push({ id: doc.id, deckName: data.deckName });
    });
    return userDecks;
  }
}

export async function addDeck(NewDeckName) {
  if (deckRef) {
    const docRef = doc(deckRef, NewDeckName);
    const ref = await setDoc(docRef, {
      deckName: NewDeckName,
    });
    console.log("Document written with ID: ", ref);
  }
}

export async function addCard(deckName, answer, question, image) {
  if (deckRef) {
    const docRef = collection(deckRef, deckName, "cards");
    const newdocReF = await addDoc(docRef, {
      answer: answer,
      question: question,
      image: image,
    });
    console.log("Document written with ID: ", newdocReF.id);
  }
}

export async function getCards(deckID) {
  if (deckRef) {
    const userCards = [];
    const cardRef = collection(deckRef, deckID, "cards");
    const snapshot = await getDocs(cardRef);
    snapshot.forEach((doc) => {
      const data = doc.data();
      userCards.push({
        id: doc.id,
        answer: data.answer,
        question: data.question,
        grade: data.grade,
        image: data.image,
      });
    });
    return userCards;
  }
}

export async function deleteCard(deckID, flashID) {
  if (deckRef) {
    console.log("deckID:", deckID);
    console.log("flashID:", flashID);
    const documentRef = doc(deckRef, deckID, "cards", flashID);
    await deleteDoc(documentRef);
  }
}

export async function changeGrade(deckID, flashcard, grade) {
  if (deckRef) {
    console.log(flashcard.image);
    const documentRef = doc(deckRef, deckID, "cards", flashcard.id);
    await setDoc(documentRef, {
      answer: flashcard.answer,
      question: flashcard.question,
      image: flashcard.image,
      grade: grade,
    });
  }
}

export async function deleteDeck(deckID) {
  if (deckRef) {
    const documentRef = doc(deckRef, deckID);
    await deleteDoc(documentRef);
  }
}

export async function editCard(deckID, flashcard, answer, question) {
  if (deckRef) {
    const documentRef = doc(deckRef, deckID, "cards", flashcard);
    await updateDoc(documentRef, {
      answer: answer,
      question: question,
    });
  }
}
