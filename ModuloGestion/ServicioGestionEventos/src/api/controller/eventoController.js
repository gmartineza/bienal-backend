const eventoService = require('../../services/eventoService');
const cloudinary = require('../../config/cloudinary');

async function crearEvento(req, res) {
  try {
    const { body, file } = req;

    let imageUrl = null;

    // Si hay una imagen, súbela a Cloudinary desde la memoria
    if (file) {
      // Convertir el buffer de la imagen a un stream para subirlo a Cloudinary
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'eventos', format: 'webp' },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          stream.end(buffer);
        });
      };

      // Subir la imagen usando el buffer
      const result = await streamUpload(file.buffer);
      imageUrl = result.secure_url;
    }

    // Llama al servicio para guardar el evento con la imagen incluida
    const nuevoEvento = await eventoService.crearEvento(body, imageUrl);

    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el evento: ' + error.message });
  }
}

const obtenerTodosLosEventos = async (req, res) => {
  try {
    const eventos = await eventoService.obtenerTodosLosEventos();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerEventoPorId = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de los parámetros de la ruta
    const evento = await eventoService.obtenerEventoPorId(id); // Llamar al servicio para obtener el evento

    if (!evento) {
      return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }

    res.status(200).json(evento);
  } catch (error) {
    console.error('Error al obtener el evento:', error);
    res.status(500).json({ mensaje: 'Error al obtener el evento' });
  }
};

const eliminarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const eventoEliminado = await eventoService.eliminarEvento(id);

    if (!eventoEliminado) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Evento eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el evento' });
  }
};

const obtenerEventosPorRango = async (req, res) => {
  try {
    const { inicio, fin } = req.query;

    // Validar que ambas fechas estén presentes
    if (!inicio || !fin) {
      return res.status(400).json({ error: 'Debes proporcionar una fecha de inicio y una de fin' });
    }

    // Convertir las fechas a objetos Date
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);

    // Verificar si las fechas son válidas
    if (!isNaN(fechaInicio.getTime()) && !isNaN(fechaFin.getTime())) {
      fechaInicio.toISOString();
      fechaFin.toISOString();
    } else {
      return res.status(400).json({ error: 'Formato de fecha no válido' });
    }

    // Llamar al servicio con las fechas convertidas
    const eventos = await eventoService.obtenerEventosPorRango(fechaInicio, fechaFin);

    // Devolver los eventos encontrados
    return res.status(200).json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos por rango:', error);
    return res.status(500).json({ error: 'Error al obtener eventos por rango de fechas' });
  }
};

const actualizarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;
    const { imagenesAEliminar } = body;

    let nuevasImagenes = [];

    // Si hay imágenes nuevas, súbelas a Cloudinary
    if (files && files.length > 0) {
      const subirImagen = (file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'eventos', format: 'webp' },
            (error, result) => {
              if (result) {
                resolve(result.secure_url);
              } else {
                reject(error);
              }
            }
          );
          stream.end(file.buffer);
        });
      };

      // Subir imágenes en paralelo
      nuevasImagenes = await Promise.all(files.map(subirImagen));
    }

    // Llamar al servicio para actualizar el evento
    const eventoActualizado = await eventoService.actualizarEvento(
      id,
      body,
      nuevasImagenes,
      JSON.parse(imagenesAEliminar || '[]') // Parsear las imágenes a eliminar
    );

    res.status(200).json(eventoActualizado);
  } catch (error) {
    console.error('Error al actualizar el evento:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el evento' });
  }
};
/**
 * Controlador para obtener eventos pasados
 * @param {Object} req - Solicitud HTTP
 * @param {Object} res - Respuesta HTTP
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
 * Controlador para obtener el evento actual
 * @param {Object} req - Solicitud HTTP
 * @param {Object} res - Respuesta HTTP
 */
async function obtenerEventoActual(req, res) {
  try {
    const eventoActual = await eventoService.obtenerEventoActual();
    if (eventoActual) {
      res.status(200).json(eventoActual);
    } else {
      res.status(404).json({ message: 'No hay un evento actual.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el evento actual: ' + error.message });
  }
}

/**
 * Controlador para obtener eventos futuros
 * @param {Object} req - Solicitud HTTP
 * @param {Object} res - Respuesta HTTP
 */
async function obtenerEventosFuturos(req, res) {
  try {
    const eventosFuturos = await eventoService.obtenerEventosFuturos();
    res.status(200).json(eventosFuturos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos futuros: ' + error.message });
  }
}

// Exporta todas las funciones como un módulo
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