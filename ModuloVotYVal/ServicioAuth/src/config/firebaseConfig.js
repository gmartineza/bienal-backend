// src/config/firebaseConfig.js

const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_KEY_PATH); // Cargar las credenciales de Firebase

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "frontend-bienal"
});

const db = admin.firestore();

module.exports = { admin, db };
