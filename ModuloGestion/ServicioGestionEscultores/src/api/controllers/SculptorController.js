/**
 * Controlador para la gestión de escultores.
 * 
 * Contiene las funciones que manejan las solicitudes HTTP para crear, actualizar, consultar y eliminar 
 * esculturas. Utiliza el servicio de esculturas y Cloudinary para la gestión de imágenes.
 * 
 * @module SculptorController
 */
const sculptorService = require('../../services/sculptorService');

/**
 * Crea un nuevo escultor en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const createSculptor = async (req, res) => {
  try {
    const sculptorData = {
      name: `${req.body.name || ''} ${req.body.lastName || ''}`.trim(),
      country: req.body.country,
      biography: req.body.biography,
      contactInfo: req.body.contactInfo,
      profileImage: req.file ? req.file.path : null,
      works: req.body.works,
    };

    const sculptor = await sculptorService.createSculptor(sculptorData);
    res.status(201).json(sculptor);
  } catch (error) {
    console.error('Error al crear el escultor:', error);
    res.status(500).json({ error: 'Error al crear el escultor' });
  }
};


/**
 * Obtiene todos los escultores de la base de datos.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const getAllSculptors = async (req, res) => {
  try {
    const sculptors = await sculptorService.getAllSculptors();
    res.status(200).json(sculptors);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los escultores: ' + error.message });
  }
};


/**
 * Obtiene un escultor específico por su ID, incluyendo las obras asociadas.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const getSculptorById = async (req, res) => {
  try {
    const { id } = req.params;
    const sculptor = await sculptorService.getSculptorById(id);
    if (!sculptor) {
      return res.status(404).json({ error: 'Escultor no encontrado' });
    }
    res.status(200).json(sculptor);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el escultor: ' + error.message });
  }
};


/**
 * Actualiza un escultor específico por su ID en la base de datos.
 * Permite agregar o eliminar esculturas del campo `works`.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Retorna el objeto del escultor actualizado o un mensaje de error.
 */
const updateSculptorById = async (req, res) => {
  try {
    const { id } = req.params;
    const { works } = req.body;

    const updateData = {
      name: `${req.body.name || ''} ${req.body.lastName || ''}`.trim(),
      country: req.body.country,
      biography: req.body.biography,
      contactInfo: req.body.contactInfo,
    };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    if (works) {
      const { worksToAdd, worksToRemove } = works;

      if (worksToAdd) {
        updateData.$addToSet = { works: { $each: worksToAdd } };
      }

      if (worksToRemove) {
        updateData.$pull = { works: { $in: worksToRemove } };
      }
    }

    const updatedSculptor = await sculptorService.updateSculptorById(id, updateData);

    if (!updatedSculptor) {
      return res.status(404).json({ message: 'Escultor no encontrado' });
    }

    res.status(200).json(updatedSculptor);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el escultor: ' + error.message });
  }
};


/**
 * Elimina un escultor de la base de datos por su ID.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const deleteSculptorById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSculptor = await sculptorService.deleteSculptorById(id);
    if (!deletedSculptor) {
      return res.status(404).json({ error: 'Escultor no encontrado' });
    }
    res.status(200).json({ message: 'Escultor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el escultor: ' + error.message });
  }
};


/**
 * Controlador para buscar escultores por nombre completo.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const searchSculptorByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ mensaje: 'El nombre completo es requerido' });
    }

    const escultores = await sculptorService.searchSculptorByName(name);

    if (escultores.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron escultores con ese nombre' });
    }

    res.status(200).json(escultores);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar escultores: ' + error.message });
  }
};

module.exports = {
  createSculptor,
  getAllSculptors,
  getSculptorById,
  updateSculptorById,
  deleteSculptorById,
  searchSculptorByName
};