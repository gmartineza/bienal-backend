// src/config/firebaseConfig.js

const admin = require('firebase-admin');
const serviceAccount = require("../../frontend-bienal-firebase-adminsdk-rih0d-dddf569c82.json"); // Cargar las credenciales de Firebase
//const serviceAccount = require(process.env.FIREBASE_KEY_PATH);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "frontend-bienal"
});

const db = admin.firestore();

module.exports = { admin, db };
