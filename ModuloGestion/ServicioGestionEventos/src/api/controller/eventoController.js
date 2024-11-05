/**
 * Controlador para la gestión de eventos.
 * 
 * Utiliza los servicios de eventos y la configuración de Cloudinary para manejar las 
 * operaciones de creación, actualización, consulta y eliminación de eventos.
 * 
 * @module EventController
 */
const eventoService = require('../../services/eventoService');
const cloudinary = require('../../config/cloudinary');

/**
 * Crea un nuevo evento en la base de datos, incluyendo una imagen opcional subida a Cloudinary.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
async function crearEvento(req, res) {
  try {
    const { body, file } = req;
    let imageUrl = null;

    if (file) {
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'eventos', format: 'webp' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(buffer);
        });
      };
      const result = await streamUpload(file.buffer);
      imageUrl = result.secure_url;
    }

    const nuevoEvento = await eventoService.crearEvento(body, imageUrl);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el evento: ' + error.message });
  }
}


/**
 * Obtiene todos los eventos de la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const obtenerTodosLosEventos = async (req, res) => {
  try {
    const eventos = await eventoService.obtenerTodosLosEventos();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Obtiene un evento específico por su ID, incluyendo los detalles de los escultores asociados.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const obtenerEventoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensaje: 'El ID del evento es requerido' });
    }

    const evento = await eventoService.obtenerEventoPorId(id);

    if (!evento) {
      return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }

    res.status(200).json(evento);
  } catch (error) {
    console.error('Error al obtener el evento:', error);
    res.status(500).json({ mensaje: 'Error al obtener el evento' });
  }
};


/**
 * Elimina un evento de la base de datos por su ID.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const eliminarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const eventoEliminado = await eventoService.eliminarEvento(id);
    if (!eventoEliminado) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.status(200).json({ mensaje: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
};


/**
 * Filtra eventos por un rango de fechas.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const obtenerEventosPorRango = async (req, res) => {
  try {
    const { inicio, fin } = req.query;
    if (!inicio || !fin) {
      return res.status(400).json({ error: 'Debes proporcionar una fecha de inicio y una de fin' });
    }
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);
    if (isNaN(fechaInicio) || isNaN(fechaFin)) {
      return res.status(400).json({ error: 'Formato de fecha no válido' });
    }
    const eventos = await eventoService.obtenerEventosPorRango(fechaInicio, fechaFin);
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener eventos por rango de fechas' });
  }
};


/**
 * Actualiza un evento con nuevos datos, incluyendo imágenes y escultores opcionales.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const actualizarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;
    let { imagenesAEliminar, escultoresAAgregar, escultoresAEliminar } = body;
    if (typeof imagenesAEliminar === 'string') imagenesAEliminar = imagenesAEliminar.split(",");
    if (typeof escultoresAAgregar === 'string') escultoresAAgregar = escultoresAAgregar.split(",");
    if (typeof escultoresAEliminar === 'string') escultoresAEliminar = escultoresAEliminar.split(",");

    let nuevasImagenes = [];
    if (files && files.length > 0) {
      const subirImagen = (file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'eventos', format: 'webp' },
            (error, result) => {
              if (result) resolve(result.secure_url);
              else reject(error);
            }
          );
          stream.end(file.buffer);
        });
      };
      nuevasImagenes = await Promise.all(files.map(subirImagen));
    }

    const eventoActualizado = await eventoService.actualizarEvento(
      id, body, nuevasImagenes, imagenesAEliminar, escultoresAAgregar, escultoresAEliminar
    );
    res.status(200).json(eventoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el evento' });
  }
};


/**
 * Busca eventos por nombre.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const buscarEventoPorNombre = async (req, res) => {
  try {
    const { q } = req.query;
    const eventos = await eventoService.buscarEventoPorNombre(q);
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar eventos por nombre' });
  }
};


/**
 * Obtiene todos los eventos pasados.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
async function obtenerEventosPasados(req, res) {
  try {
    const eventosPasados = await eventoService.obtenerEventosPasados();
    res.status(200).json(eventosPasados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos pasados: ' + error.message });
  }
}


/**
 * Obtiene el evento actual.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
async function obtenerEventoActual(req, res) {
  try {
    const eventoActual = await eventoService.obtenerEventoActual();
    if (eventoActual) {
      res.status(200).json(eventoActual);
    } else {
      res.status(204).json({ message: 'No hay un evento actual.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el evento actual: ' + error.message });
  }
}


/**
 * Obtiene todos los eventos futuros.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
async function obtenerEventosFuturos(req, res) {
  try {
    const eventosFuturos = await eventoService.obtenerEventosFuturos();
    res.status(200).json(eventosFuturos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos futuros: ' + error.message });
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
  actualizarEvento,
  buscarEventoPorNombre
};