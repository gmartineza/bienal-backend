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

async function obtenerEventos(req, res) {
  try {
    const eventos = await eventoService.obtenerEventos();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
}

async function obtenerEventoPorId(req, res) {
  try {
    const { id } = req.params;
    const evento = await eventoService.obtenerEventoPorId(id);

    if (!evento) {
      return res.status(404).json({ error: 'No se encontró un evento con ese ID' });
    }

    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el evento por ID' });
  }
}

async function obtenerEventosPorTema(req, res) {
  try {
    const { theme } = req.body;
    const eventos = await eventoService.obtenerEventosPorTema(theme);

    if (eventos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron eventos con esa temática' });
    }

    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos por tema' });
  }
}

async function actualizarEvento(req, res) {
  try {
    const { id } = req.params; 
    const eventoActualizado = await eventoService.actualizarEvento(id, req.body);

    if (!eventoActualizado) {
      return res.status(404).json({ error: 'No se encontró un evento con ese ID para actualizar' });
    }

    res.status(200).json(eventoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
}

async function eliminarEvento(req, res) {
  try {
    const { id } = req.params; 
    const resultado = await eventoService.eliminarEvento(id);

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ error: 'No se encontró un evento con ese ID para eliminar' });
    }

    res.status(200).json({ mensaje: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
}

// Exporta todas las funciones como un módulo
module.exports = {
  crearEvento,
  obtenerEventos,
  obtenerEventoPorId,
  obtenerEventosPorTema,
  actualizarEvento,
  eliminarEvento
};
