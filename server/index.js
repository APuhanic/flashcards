import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccount from "./config/serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working fine");
});

// Example API endpoint to GET USER DECKS
app.get("/api/decks/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("decks")
      .get();
    const decks = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    res.json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
});

// Example API endpoint to handle ADDING DECKS
app.post("/api/decks/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const deckName = req.body.deckName;
    const docRef = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("decks")
      .doc(deckName)
      .set({
        deckName: deckName,
      });

    res.json({ id: docRef.id, deckName: deckName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add deck" });
  }
});

// api endpoint to handle GETTING CARDS
app.get("/api/decks/:userID/:deckName/cards", async (req, res) => {
  try {
    const userID = req.params.userID;
    const deckName = req.params.deckName;
    const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("decks")
      .doc(deckName)
      .collection("cards")
      .get();
    const cards = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
});

// api endpoint to handle ADDING CARDS
app.post("/api/decks/:userID/:deckName/cards", async (req, res) => {
  try {
    const userID = req.params.userID;
    const deckName = req.params.deckName;
    const answer = req.body.answer;
    const question = req.body.question;
    let image = req.body.image;
    if (image === undefined) {
      image = "";
    }
    const docRef = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("decks")
      .doc(deckName)
      .collection("cards")
      .add({
        answer: answer,
        question: question,
        image: image,
      });
    res.json({
      id: docRef.id,
      answer: answer,
      question: question,
      image: image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add card" });
  }
});

// api endpoint to handle DELETING CARDS
app.delete("/api/decks/:userID/:deckID/cards/:flashID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const deckID = req.params.deckID;
    const flashID = req.params.flashID;

    const docRef = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("decks")
      .doc(deckID)
      .collection("cards")
      .doc(flashID)
      .delete();
    res.json({ id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete card" });
  }
});

// api endpoint to handle changeing grades
app.put("/api/decks/:userID/:deckID/cards/:flashID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const deckID = req.params.deckID;
    const flashID = req.params.flashID;
    const grade = req.body.grade;
    const docRef = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("decks")
      .doc(deckID)
      .collection("cards")
      .doc(flashID)
      .update({
        grade: grade,
      });

    res.json({ id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update grade" });
  }
});
// api endpoint to handle deleting decks
app.delete("/api/decks/:userID/:deckID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const deckID = req.params.deckID;
    const docRef = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("decks")
      .doc(deckID)
      .delete();
    res.json({ id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete deck" });
  }
});

//api endpoint to handle editing cards
app.put("/api/decks/:userID/:deckID/cards/:flashID/edit", async (req, res) => {
  try {
    const userID = req.params.userID;
    const deckID = req.params.deckID;
    const flashID = req.params.flashID;
    const answer = req.body.answer;
    const question = req.body.question;
    const docRef = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("decks")
      .doc(deckID)
      .collection("cards")
      .doc(flashID)
      .update({
        answer: answer,
        question: question,
      });
    res.json({ id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update card" });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
