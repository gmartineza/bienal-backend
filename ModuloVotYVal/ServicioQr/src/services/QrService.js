// src/services/qrService.js

export const generateUniqueUrl = (numeroevento, numeroescultor, token) => {
  const baseUrl = process.env.FRONTEND_URL;
  return `${baseUrl}/vote/${numeroevento}/${numeroescultor}/${token}`;
};
