/**
 * Controlador para la gestión de esculturas.
 * 
 * Contiene las funciones que manejan las solicitudes HTTP para crear, actualizar, consultar y eliminar 
 * esculturas. Utiliza el servicio de esculturas y Cloudinary para la gestión de imágenes.
 * 
 * @module EsculturaController
 */
const esculturaService = require('../../services/esculturaService');
const cloudinary = require('../../config/cloudinary');

/**
 * Crea una nueva escultura en la base de datos, incluyendo imágenes opcionales subidas a Cloudinary.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const crearEscultura = async (req, res) => {
  try {
    const { body, files } = req;
    let imagenesPre = [];
    let imagenesDurante = [];
    let imagenesPost = [];

    const subirImagen = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'esculturas', format: 'webp' },
          (error, result) => {
            if (result) resolve(result.secure_url);
            else reject(error);
          }
        );
        stream.end(file.buffer);
      });
    };

    if (files) {
      if (files.imagenesPre) {
        for (const file of files.imagenesPre) {
          imagenesPre.push(await subirImagen(file));
        }
      }
      if (files.imagenesDurante) {
        for (const file of files.imagenesDurante) {
          imagenesDurante.push(await subirImagen(file));
        }
      }
      if (files.imagenesPost) {
        for (const file of files.imagenesPost) {
          imagenesPost.push(await subirImagen(file));
        }
      }
    }

    const nuevaEscultura = await esculturaService.crearEscultura(body, imagenesPre, imagenesDurante, imagenesPost);
    res.status(201).json(nuevaEscultura);
  } catch (error) {
    console.error('Error en actualizarEscultura:', error);  // Agrega el error completo a la consola
    res.status(500).json({ error: 'Error al crear la escultura: ' + error.message });
  }
};


/**
 * Obtiene todas las esculturas de la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const obtenerEsculturas = async (req, res) => {
  try {
    const esculturas = await esculturaService.obtenerEsculturas();
    res.status(200).json(esculturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Obtiene una escultura específica por su ID.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const obtenerEsculturaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const escultura = await esculturaService.obtenerEsculturaPorId(id);

    if (!escultura) {
      return res.status(404).json({ mensaje: 'Escultura no encontrada' });
    }

    res.status(200).json(escultura);
  } catch (error) {
    console.error('Error al obtener la escultura:', error);
    res.status(500).json({ mensaje: 'Error al obtener la escultura' });
  }
};



/**
 * Actualiza una escultura en la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const actualizarEscultura = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;
    const { imagenesAEliminarPre = [], imagenesAEliminarDurante = [], imagenesAEliminarPost = [] } = body;

    let nuevasImagenesPre = [];
    let nuevasImagenesDurante = [];
    let nuevasImagenesPost = [];

    const subirImagen = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'esculturas', format: 'webp' },
          (error, result) => {
            if (result) resolve(result.secure_url);
            else reject(error);
          }
        );
        stream.end(file.buffer);
      });
    };

    if (files) {
      if (files.imagenesPre) {
        for (const file of files.imagenesPre) {
          nuevasImagenesPre.push(await subirImagen(file));
        }
      }
      if (files.imagenesDurante) {
        for (const file of files.imagenesDurante) {
          nuevasImagenesDurante.push(await subirImagen(file));
        }
      }
      if (files.imagenesPost) {
        for (const file of files.imagenesPost) {
          nuevasImagenesPost.push(await subirImagen(file));
        }
      }
    }

    const esculturaActualizada = await esculturaService.actualizarEscultura(
      id,
      body,
      nuevasImagenesPre,
      nuevasImagenesDurante,
      nuevasImagenesPost,
      imagenesAEliminarPre,
      imagenesAEliminarDurante,
      imagenesAEliminarPost
    );

    res.status(200).json(esculturaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la escultura' });
  }
};


/**
 * Elimina una escultura de la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const eliminarEscultura = async (req, res) => {
  try {
    const { id } = req.params;
    const esculturaEliminada = await esculturaService.eliminarEscultura(id);
    if (!esculturaEliminada) {
      return res.status(404).json({ mensaje: 'Escultura no encontrada' });
    }
    res.status(200).json({ mensaje: 'Escultura eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la escultura' });
  }
};


/**
 * Busca esculturas por nombre.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const buscarEsculturaPorNombre = async (req, res) => {
  try {
    const { name } = req.query;
    const esculturas = await esculturaService.obtenerEsculturasPorNombre(name);
    res.status(200).json(esculturas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar esculturas por nombre' });
  }
};


module.exports = {
  crearEscultura,
  obtenerEsculturas,
  obtenerEsculturaPorId,
  actualizarEscultura,
  eliminarEscultura,
  buscarEsculturaPorNombre,
};