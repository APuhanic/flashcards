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

// Example API endpoint to get user decks
// Example API endpoint to handle /api/decks GET request
app.get("/api/decks/:userID", async (req, res) => {
  try {
    // Retrieve the userID from the request parameters
    const userID = req.params.userID;
    console.log(userID);
    // Implement the logic to fetch the decks associated with the userID from the database
    // For example:
    const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("decks")
      .get();
    const decks = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log(decks);
    res.json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
});

// Add more API endpoints for other operations

// Example API endpoint to handle /api/decks POST request
app.post("/api/decks/:userID", async (req, res) => {
  try {
    // Retrieve the userID from the request parameters
    const userID = req.params.userID;
    console.log(userID);
    // Retrieve the deckName from the request body
    const deckName = req.body.deckName;
    console.log(deckName);
    // Implement the logic to add the deck to the database
    // For example:
    const docRef = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("decks")
      .add({
        deckName: deckName,
      });
    console.log("Document written with ID: ", docRef.id);
    res.json({ id: docRef.id, deckName: deckName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add deck" });
  }
});



const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
