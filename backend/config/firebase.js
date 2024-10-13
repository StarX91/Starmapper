const admin = require("firebase-admin");

try {
  const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert("./serviceAccountKey.json"),
  });

  console.log(`Connected to Firebase: ${firebaseApp.name}`);
} catch (err) {
  console.error(`Error connecting to Firebase:`, err);
}
