// src/services/qrService.js
export const generateUniqueUrl = (token, numeroevento, numeroescultor) => {
  return process.env.FRONTEND_URL+`/verifyToken.html?token=${token}&numeroevento=${numeroevento}&numeroescultor=${numeroescultor}`;
};
