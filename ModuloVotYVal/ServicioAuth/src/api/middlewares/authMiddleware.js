// src/api/middlewares/authMiddleware.js

const { admin, db } = require('../../config/firebaseConfig');

// Middleware para verificar el token de autenticación y el rol de usuario.
const verifyToken = async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        console.log("Token no proporcionado en la cookie");
        return res.status(401).json({ message: 'Token no proporcionado en la cookie' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        
        const userRef = db.collection('users').doc(req.user.uid);
        const doc = await userRef.get();

        if (!doc.exists) {
            console.log("No se encontró el usuario en Firestore.");
            return res.status(404).json({ message: 'Usuario no encontrado en Firestore' });
        }

        const userData = doc.data();
        req.user.isAdmin = userData.role === 'admin';

        if (req.user.isAdmin) {
            console.log("Ingreso de administrador:", req.user.name);
        } else {
            console.log("Ingreso de usuario no administrador:", req.user.name);
        }

        next();
    } catch (error) {
        console.error("Error al validar el token de Firebase:", error);
        return res.status(403).json({ message: 'Token inválido o expirado, vuelva a iniciar sesión' });
    }
};

// Middleware para verificar si el usuario es administrador
const verifyAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        console.log("Acceso denegado. El usuario no es administrador:", req.user.name);
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden acceder a esta ruta.' });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };
