const Evento = require('../db/models/Event');

/**
 * Crea un nuevo evento
 * @param {Object} data - Datos del evento a crear
 * @returns {Promise<Object>} El evento creado
 * @throws {Error} Si hay un error al crear el evento
 */
async function crearEvento(data, imageUrl = null) {
  try {
    // Crear el objeto del evento con todos los campos requeridos
    const eventoData = {
      name: data.name,
      description: data.description,
      date: data.date,
      location: data.location,
      theme: data.theme || null,
      sculptors: data.sculptors || [],
      sculptures: data.sculptures || [],
      images: imageUrl ? [imageUrl] : data.images || [],
    };

    // Crear una nueva instancia del modelo Evento
    const nuevoEvento = new Evento(eventoData);

    // Guardar el evento en la base de datos
    return await nuevoEvento.save();
  } catch (error) {
    throw new Error(`Error al crear el evento: ${error.message}`);
  }
}


/**
 * Obtiene todos los eventos
 * @returns {Promise<Array>} Lista de todos los eventos
 * @throws {Error} Si hay un error al obtener los eventos
 */
async function obtenerEventos() {
  try {
    return await Evento.find();
  } catch (error) {
    throw new Error('Error al obtener los eventos: ' + error.message);
  }
}

/**
 * Actualiza un evento existente
 * @param {string} id - ID del evento a actualizar
 * @param {Object} data - Nuevos datos del evento
 * @returns {Promise<Object>} El evento actualizado
 * @throws {Error} Si hay un error al actualizar el evento
 */
async function actualizarEvento(id, data) {
  try {
    return await Evento.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  } catch (error) {
    throw new Error('Error al actualizar el evento: ' + error.message);
  }
}

/**
 * Obtiene eventos por tema
 * @param {string} theme - Tema de los eventos a buscar
 * @returns {Promise<Array>} Lista de eventos con el tema especificado
 * @throws {Error} Si hay un error al obtener los eventos por tema
 */
async function obtenerEventosPorTema(theme) {
  try {
    return await Evento.find({ theme });
  } catch (error) {
    throw new Error('Error al obtener los eventos por tema: ' + error.message);
  }
}

/**
 * Obtiene un evento por su ID
 * @param {string} id - ID del evento a buscar
 * @returns {Promise<Object>} El evento encontrado
 * @throws {Error} Si hay un error al obtener el evento por ID
 */
async function obtenerEventoPorId(id) {
  try {
    return await Evento.findById(id);
  } catch (error) {
    throw new Error('Error al obtener el evento por ID: ' + error.message);
  }
}

/**
 * Elimina un evento por su ID
 * @param {string} id - ID del evento a eliminar
 * @returns {Promise<Object>} El resultado de la operación de eliminación
 * @throws {Error} Si hay un error al eliminar el evento
 */
async function eliminarEvento(id) {
  try {
    return await Evento.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error al eliminar el evento: ' + error.message);
  }
}

module.exports = {
  crearEvento,
  obtenerEventos,
  actualizarEvento,
  obtenerEventosPorTema,
  obtenerEventoPorId,
  eliminarEvento
};
