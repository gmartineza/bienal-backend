const Evento = require('../db/models/Event');

//ADMINISTRADOR
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
      date_inicio: data.date_inicio,
      date_fin: data.date_fin,
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

async function obtenerTodosLosEventos() {
  try {
    const eventos = await Evento.find().select('name date_inicio date_fin location');
    return eventos;
  } catch (error) {
    throw new Error('Error al obtener todos los eventos: ' + error.message);
  }
}

const obtenerEventoPorId = async (id) => {
  try {
    // Buscar el evento por ID en la base de datos
    const evento = await Evento.findById(id);
    return evento;
  } catch (error) {
    throw new Error(`Error al obtener el evento por ID: ${error.message}`);
  }
};

const eliminarEvento = async (id) => {
  try {
    const eventoEliminado = await Evento.findByIdAndDelete(id);
    return eventoEliminado;
  } catch (error) {
    throw new Error('Error al eliminar el evento');
  }
};

const obtenerEventosPorRango = async (inicio, fin) => {
  try {
    // Consulta a la base de datos
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

const actualizarEvento = async (id, data, nuevasImagenes = [], imagenesAEliminar = []) => {
  try {
    // Encontrar el evento por ID
    const evento = await Evento.findById(id);
    if (!evento) {
      throw new Error('Evento no encontrado');
    }

    // Actualizar los campos del evento
    evento.name = data.name || evento.name;
    evento.description = data.description || evento.description;
    evento.date_inicio = data.date_inicio || evento.date_inicio;
    evento.date_fin = data.date_fin || evento.date_fin;
    evento.location = data.location || evento.location;
    evento.theme = data.theme || evento.theme;

    // Manejar la eliminación de imágenes
    if (imagenesAEliminar.length > 0) {
      evento.images = evento.images.filter(img => !imagenesAEliminar.includes(img));
    }

    // Agregar nuevas imágenes
    if (nuevasImagenes.length > 0) {
      evento.images.push(...nuevasImagenes);
    }

    // Guardar el evento actualizado en la base de datos
    await evento.save();
    return evento;
  } catch (error) {
    console.error('Error en el servicio de actualizar evento:', error);
    throw new Error('No se pudo actualizar el evento');
  }
};

/**
 * Obtiene el evento actual con campos específicos
 * @returns {Promise<Object>} Evento actual
*/
async function obtenerEventoActual() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Configura la fecha actual sin horas
    
    // Buscar un evento cuya fecha actual esté dentro del rango de date_inicio y date_fin
    const eventoActual = await Evento.findOne({
      date_inicio: { $lte: today },
      date_fin: { $gte: today },
    }).select('name description images');
    
    return eventoActual;
  } catch (error) {
    throw new Error('Error al obtener el evento actual: ' + error.message);
  }
}

/**
 * Obtiene eventos pasados con campos específicos
 * @returns {Promise<Array>} Lista de eventos pasados
 */
async function obtenerEventosPasados() {
  try {
    // Obtiene la medianoche del día actual
    const today = new Date();

    // Encuentra eventos cuya fecha sea menor a la medianoche de hoy
    const eventosPasados = await Evento.find({ 
      date_inicio: { $lt: today },
      date_fin: { $lt: today }
    })
      .select('name description images');

    return eventosPasados;
  } catch (error) {
    throw new Error('Error al obtener los eventos pasados: ' + error.message);
  }
}
/**
 * Obtiene eventos futuros con campos específicos
 * @returns {Promise<Array>} Lista de eventos futuros
 */
async function obtenerEventosFuturos() {
  try {
    // Obtiene la medianoche del día actual
    const today = new Date();

    // Encuentra eventos cuya fecha sea menor a la medianoche de hoy
    const eventosFuturos = await Evento.find({ 
      date_inicio: { $gt: today },
      date_fin: { $gt: today }
    })
      .select('name description images');

    return eventosFuturos;
  } catch (error) {
    throw new Error('Error al obtener los eventos futuros: ' + error.message);
  }
}

module.exports = {
  crearEvento,
  obtenerEventosPasados,
  obtenerEventoActual,
  obtenerEventosFuturos,
  obtenerEventoPorId,
  eliminarEvento,
  obtenerTodosLosEventos,
  obtenerEventosPorRango,
  actualizarEvento
};
