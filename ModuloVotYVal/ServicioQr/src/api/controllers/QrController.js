import { generateQRCodeService, generateTokenService, validateTokenService } from '../../services/QrService.js';
import { SECRET_KEY, TOKEN_EXPIRATION_TIME } from '../../config/QrConfig.js';

let tokenIntervalId = null;

// Genera un token y lo devuelve
export function generateToken() {
  return generateTokenService();
}

// Genera el código QR usando el token y datos adicionales
export async function generateQRCode(token, eventNumber, sculptorNumber) {
  return await generateQRCodeService(token, eventNumber, sculptorNumber);
}

// Valida el token
export async function validateQRToken(token) {
  return await validateTokenService(token);
}

// Inicia el intervalo de regeneración de tokens
export function startTokenInterval() {
  tokenIntervalId = setInterval(() => {
    const newToken = generateToken();
    console.log(`Nuevo token generado: ${newToken}`);
  }, TOKEN_EXPIRATION_TIME * 1000);
}

// Detiene el intervalo de regeneración de tokens
export function stopTokenInterval() {
  if (tokenIntervalId) {
    clearInterval(tokenIntervalId);
    tokenIntervalId = null;
    console.log('Intervalo de regeneración de tokens detenido');
  }
}
