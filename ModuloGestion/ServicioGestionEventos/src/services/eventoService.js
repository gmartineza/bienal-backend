/**
 * Servicio de gestión de eventos.
 * 
 * Proporciona funciones para crear, actualizar, eliminar y consultar eventos en la base de datos.
 * 
 * @module EventService
 */

const Evento = require('../db/models/Event');

/**
 * Crea un nuevo evento en la base de datos.
 * 
 * @param {Object} data - Objeto con los datos necesarios para crear el evento.
 * @param {string|null} [imageUrl=null] - URL opcional de una imagen asociada al evento. Si se proporciona, se añadirá a la lista de imágenes.
 * @returns {Promise<Object>} - Retorna el objeto del evento creado.
 * @throws {Error} - Lanza un error si ocurre un problema al crear el evento en la base de datos.
 */
async function crearEvento(data) {
  try {
    const eventoData = {
      name: data.name,
      description: data.description,
      date_inicio: data.date_inicio,
      date_fin: data.date_fin,
      location: data.location,
      theme: data.theme || null,
      sculptors: data.sculptors || [],
      images: imageUrl ? [imageUrl] : data.images || [],
    };

    const nuevoEvento = new Evento(eventoData);

    return await nuevoEvento.save();
  } catch (error) {
    throw new Error('Error al crear el evento: ' + error.message);
  }
}


/**
 * Obtiene una lista de todos los eventos almacenados en la base de datos.
 *
 * @returns {Promise<Array>} - Retorna un array de objetos de eventos con los campos seleccionados (name, date_inicio, date_fin, location).
 * @throws {Error} - Lanza un error si ocurre un problema al recuperar los eventos de la base de datos.
 */
async function obtenerTodosLosEventos() {
  try {
    const eventos = await Evento.find().select('name date_inicio date_fin location');
    return eventos;
  } catch (error) {
    throw new Error('Error al obtener los eventos: ' + error.message);
  }
}


/**
 * Obtiene un evento específico por su ID, incluyendo los detalles de los escultores asociados.
 *
 * @param {string} id - El ID del evento a buscar.
 * @returns {Promise<Object|null>} - Retorna el objeto del evento si se encuentra, o `null` si no existe.
 * @throws {Error} - Lanza un error si ocurre un problema al buscar el evento por ID.
 */
const obtenerEventoPorId = async (id) => {
  try {
    const evento = await Evento.findById(id).populate('sculptors');
    return evento;
  } catch (error) {
    throw new Error('Error al actualizar el evento: ' + error.message);
  }
};


/**
 * Elimina un evento de la base de datos por su ID.
 *
 * @param {string} id - El ID del evento a eliminar.
 * @returns {Promise<Object|null>} - Retorna el objeto del evento eliminado si se encuentra y elimina, o `null` si no existe.
 * @throws {Error} - Lanza un error si ocurre un problema al intentar eliminar el evento.
 */
const eliminarEvento = async (id) => {
  try {
    const eventoEliminado = await Evento.findByIdAndDelete(id);
    return eventoEliminado;
  } catch (error) {
    throw new Error('Error al eliminar el evento: ' + error.message);
  }
};


/**
 * Obtiene eventos que se encuentra dentro de un rango de fechas especifíco.
 *
 * @param {Date} inicio - Fecha de inicio del rango.
 * @param {Date} fin - Fecha de fin del rango.
 * @returns {Promise<Array>} - Retorna un array de eventos que se encuentran en el rango de fechas especificado.
 * @throws {Error} - Lanza un error si ocurre un problema al intentar obtener los eventos por rango.
 */
const obtenerEventosPorRango = async (inicio, fin) => {
  try {
    return await Evento.find({
      $or: [
        { date_inicio: { $lte: fin }, date_fin: { $gte: inicio } },
        { date_inicio: { $gte: inicio, $lte: fin } },
        { date_fin: { $gte: inicio, $lte: fin } }
      ]
    });
  } catch (error) {
    console.error('Error en el servicio de obtener eventos por rango:', error.message);
    throw new Error('No se pudieron obtener los eventos por rango');
  }
};


/**
 * Actualiza un evento existente en la base de datos con los datos proporcionados.
 *
 * @param {string} id - El ID del evento a actualizar.
 * @param {Object} data - Objeto con los datos actualizados del evento.
 * @param {Array<string>} [nuevasImagenes=[]] - Array de URLs de nuevas imágenes a agregar al evento.
 * @param {Array<string>} [imagenesAEliminar=[]] - Array de URLs de imágenes que se deben eliminar del evento.
 * @param {Array<string>} [escultoresAAgregar=[]] - Array de IDs de escultores que se deben agregar al evento.
 * @param {Array<string>} [escultoresAEliminar=[]] - Array de IDs de escultores que se deben eliminar del evento.
 * @returns {Promise<Object>} - Retorna el objeto del evento actualizado.
 * @throws {Error} - Lanza un error si el evento no se encuentra o si ocurre un problema al actualizar.
 */
const actualizarEvento = async (id, data, nuevasImagenes = [], imagenesAEliminar = [], 
  escultoresAAgregar = [], escultoresAEliminar = []) => {
  try {
    const evento = await Evento.findById(id);
    if (!evento) {
      throw new Error('Evento no encontrado');
    }

    evento.name = data.name || evento.name;
    evento.description = data.description || evento.description;
    evento.date_inicio = data.date_inicio || evento.date_inicio;
    evento.date_fin = data.date_fin || evento.date_fin;
    evento.location = data.location || evento.location;
    evento.theme = data.theme || evento.theme;

    if (escultoresAEliminar.length > 0) {
      evento.sculptors = evento.sculptors.filter(
        sculptorId => !escultoresAEliminar.includes(sculptorId.toString())
      );
    }

    escultoresAAgregar.forEach((idEscultor) => {
      if (!evento.sculptors.includes(idEscultor)) {
        evento.sculptors.push(idEscultor);
      }
    });

    if (imagenesAEliminar.length > 0) {
      evento.images = evento.images.filter(img => !imagenesAEliminar.includes(img));
    }

    if (nuevasImagenes.length > 0) {
      evento.images.push(...nuevasImagenes);
    }

    await evento.save();
    return evento;
  } catch (error) {
    console.error('Error en el servicio de actualizar evento:', error);
    throw new Error('No se pudo actualizar el evento');
  }
};


/**
 * Busca eventos cuyo nombre coincida parcial o completamente con el nombre proporcionado,
 * de manera insensible a mayúsculas y minúsculas.
 *
 * @param {string} nombre - El nombre o parte del nombre del evento a buscar.
 * @returns {Promise<Array>} - Retorna un array de eventos que coinciden con el nombre buscado, mostrando solo los campos `name`, `date_inicio`, y `date_fin`.
 * @throws {Error} - Lanza un error si ocurre un problema al realizar la búsqueda.
 */
const buscarEventoPorNombre = async (nombre) => {
  try {
    const regex = new RegExp(nombre, 'i');
    const eventos = await Evento.find({ name: { $regex: regex } }).select('name date_inicio date_fin');
    
    return eventos;
  } catch (error) {
    throw new Error('Error al buscar eventos por nombre: ' + error.message);
  }
};


/**
 * Obtiene el evento actual, es decir, aquel cuyo rango de fechas incluye la fecha de hoy.
 *
 * @returns {Promise<Object|null>} - Retorna el objeto del evento actual si existe, incluyendo solo los campos `name`, `description`, e `images`.
 * @throws {Error} - Lanza un error si ocurre un problema al intentar obtener el evento actual.
 */
async function obtenerEventoActual() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const eventoActual = await Evento.findOne({
      date_inicio: { $lte: today },
      date_fin: { $gte: today },
    }).select('name description images');
    
    return eventoActual;
  } catch (error) {
    throw new Error('Error al obtener los eventos por tema: ' + error.message);
  }
}


/**
 * Obtiene todos los eventos pasados, es decir, aquellos cuya fecha de finalización
 * es anterior a la fecha de hoy.
 *
 * @returns {Promise<Array>} - Retorna una lista de eventos pasados, incluyendo solo los campos `name`, `description`, e `images`.
 * @throws {Error} - Lanza un error si ocurre un problema al intentar obtener los eventos pasados.
 */
async function obtenerEventosPasados() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventosPasados = await Evento.find({ 
      date_inicio: { $lt: today },
      date_fin: { $lt: today }
    }).select('name description images');

    return eventosPasados;
  } catch (error) {
    throw new Error('Error al obtener el evento por ID: ' + error.message);
  }
}


/**
 * Obtiene todos los eventos futuros, es decir, aquellos cuya fecha de inicio
 * son posteriores a la fecha de hoy.
 *
 * @returns {Promise<Array>} - Retorna una lista de eventos futuros, incluyendo solo los campos `name`, `description`, e `images`.
 * @throws {Error} - Lanza un error si ocurre un problema al intentar obtener los eventos futuros.
 */
async function obtenerEventosFuturos() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventosFuturos = await Evento.find({ 
      date_inicio: { $gt: today },
      date_fin: { $gt: today }
    }).select('name description images');

    return eventosFuturos;
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
  eliminarEvento,
  obtenerTodosLosEventos,
  obtenerEventosPorRango,
  actualizarEvento,
  buscarEventoPorNombre
};
