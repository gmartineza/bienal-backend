// src/services/qrService.js

export const generateUniqueUrl = (token, numeroevento, numeroescultor) => {
  const baseUrl = process.env.FRONTEND_URL;
  return `${baseUrl}/vote/?numeroevento=${numeroevento}/numeroescultor=${numeroescultor}/token=${token}`;
};
