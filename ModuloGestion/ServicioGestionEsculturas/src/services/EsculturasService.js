const Escultura = require('../db/models/Escultura.js');

/**
 * Crea una nueva Escultura
 * @param {Object} data - Datos de la Escultura a crear
 * @returns {Promise<Object>} La Escultura creada
 * @throws {Error} Si hay un error al crear la Escultura
 */
async function crearEscultura(data) {
  try {
    const nuevaEscultura = new Escultura(data);
    return await nuevaEscultura.save();
  } catch (error) {
    throw new Error('Error al crear la escultura: ' + error.message);
  }
}

/**
 * Obtiene todos las Esculturas
 * @returns {Promise<Array>} Lista de todos las Esculturas
 * @throws {Error} Si hay un error al obtener las Esculturas
 */
async function obtenerEsculturas() {
  try {
    return await Escultura.find();
  } catch (error) {
    throw new Error('Error al obtener los esculturas: ' + error.message);
  }
}

/**
 * Actualiza una Escultura existente
 * @param {string} id - ID de la Escultura a actualizar
 * @param {Object} data - Nuevos datos de la Escultura
 * @returns {Promise<Object>} La Escultura actualizada
 * @throws {Error} Si hay un error al actualizar la Escultura
 */
async function actualizarEscultura(id, data) {
  try {
    return await Escultura.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  } catch (error) {
    throw new Error('Error al actualizar la escultura: ' + error.message);
  }
}

/**
 * Obtiene esculturas por nombre
 * @param {string} name - Nombre de la escultura a buscar
 * @returns {Promise<Array>} Lista de esculturas con el nombre especificado
 * @throws {Error} Si hay un error al obtener las esculturas por nombre
 */
async function obtenerEsculturasPorNombre(name) {
  try {
    return await Escultura.find({ name });
  } catch (error) {
    throw new Error('Error al obtener las esculturas por nombre: ' + error.message);
  }
}

/**
 * Obtiene un escultura por su ID
 * @param {string} id - ID de la escultura a buscar
 * @returns {Promise<Object>} La escultura encontrado
 * @throws {Error} Si hay un error al obtener la escultura por ID
 */
async function obtenerEsculturaPorId(id) {
  try {
    return await Escultura.findById(id);
  } catch (error) {
    throw new Error('Error al obtener la escultura por ID: ' + error.message);
  }
}

/**
 * Encuentra esculturas por el ID del escultor
 * @param {ObjectId} sculptorId - El ID del escultor
 * @returns {Promise<Array>} Lista de esculturas encontradas
 * @throws {Error} Si ocurre un error al buscar las esculturas
 */
async function encontrarEsculturasPorEscultor(sculptorId) {
  try {
    // Busca las esculturas donde el campo sculptor coincida con el ObjectId proporcionado
    const esculturas = await Escultura.find({ sculptor: sculptorId }).populate('sculptor');
    return esculturas;
  } catch (error) {
    throw new Error('Error al buscar las esculturas: ' + error.message);
  }
}

/**
 * Elimina un escultura por su ID
 * @param {string} id - ID de la escultura a eliminar
 * @returns {Promise<Object>} El resultado de la operación de eliminación
 * @throws {Error} Si hay un error al eliminar la escultura
 */
async function eliminarEscultura(id) {
  try {
    return Escultura.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error al eliminar la escultura: ' + error.message);
  }
}

module.exports = {
  crearEscultura,
  obtenerEsculturas,
  actualizarEscultura,
  obtenerEsculturasPorNombre,
  obtenerEsculturaPorId,
  encontrarEsculturasPorEscultor,
  eliminarEscultura
};
