import { getFirestore, collection } from "firebase/firestore";
import app from "./firebase";
import axios from "axios";

const db = getFirestore(app);

var deckRef;

export function setUserDBref(userID) {
  deckRef = collection(db, "users", userID, "decks");
}

export function clearuserDBref() {
  deckRef = null;
}

export async function getDecks(userID) {
  console.log(userID);
  try {
    const response = await axios.get(
      `http://localhost:3001/api/decks/${userID}`
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch decks");
  }
}
export async function addDeck(userID, NewDeckName) {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/decks/${userID}`,
      {
        deckName: NewDeckName,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add deck");
  }
}

export async function addCard(userID, deckName, answer, question, image) {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/decks/${userID}/${deckName}/cards`,
      {
        answer: answer,
        question: question,
        image: image,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add card");
  }
}

export async function getCards(userID, deckID) {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/decks/${userID}/${deckID}/cards`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch cards");
  }
}

export async function deleteCard(userID, deckID, flashID) {
  try {
    const response = await axios.delete(
      `http://localhost:3001/api/decks/${userID}/${deckID}/cards/${flashID}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete card");
  }
}

export async function changeGrade(userID, deckID, flashcard, grade) {
  try {
    const response = await axios.put(
      `http://localhost:3001/api/decks/${userID}/${deckID}/cards/${flashcard.id}`,
      {
        grade: grade,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to change grade");
  }
}
export async function deleteDeck(userID, deckID) {
  try {
    const response = await axios.delete(
      `http://localhost:3001/api/decks/${userID}/${deckID}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete deck");
  }
}

export async function editCard(userID, deckID, flashID, question, answer) {
  try {
    const response = await axios.put(
      `http://localhost:3001/api/decks/${userID}/${deckID}/cards/${flashID}/edit`,
      {
        question: question,
        answer: answer,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to edit card");
  }
}
