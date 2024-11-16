// src/api/controllers/authController.js

const { verifyToken } = require('../middlewares/authMiddleware');

// Función para manejar la autenticación
const authenticate = (req, res) => {
    console.log("Solicitud autenticada recibida del usuario:", req.user.name);

    res.json({
        message: 'Autenticación exitosa',
        user: {
            name: req.user.name,
            picture: req.user.picture,
            isAdmin: req.user.isAdmin // Devuelve si el usuario es admin o no
        }
    });
};

module.exports = { authenticate };
