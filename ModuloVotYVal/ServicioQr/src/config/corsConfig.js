// src/config/corsConfig.js
export const SECRET_KEY = 'your_secret_key';

export const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://127.0.0.1:4000', process.env.FRONTEND_URL];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
};
