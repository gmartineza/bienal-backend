// src/services/authService.js

const { admin } = require('../config/firebaseConfig');

// Verificar token de Firebase
const verifyIdToken = async (token) => {
    try {
        return await admin.auth().verifyIdToken(token);
    } catch (error) {
        throw new Error('Error al verificar el token');
    }
};

module.exports = { verifyIdToken };
