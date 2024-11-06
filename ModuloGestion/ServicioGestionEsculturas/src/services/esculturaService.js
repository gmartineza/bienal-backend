/**
 * Servicio de gestión de esculturas.
 * 
 * Proporciona funciones para crear, actualizar, eliminar y consultar esculturas en la base de datos. 
 * 
 * @module EsculturaService
 */
const Escultura = require('../db/models/sculpture');

/**
 * Crea una nueva escultura en la base de datos.
 * 
 * @param {Object} data - Objeto con los datos necesarios para crear la escultura.
 * @param {string[]} [imagenesPre=[]] - Array opcional de URLs de imágenes previas a la creación.
 * @param {string[]} [imagenesDurante=[]] - Array opcional de URLs de imágenes durante la creación.
 * @param {string[]} [imagenesPost=[]] - Array opcional de URLs de imágenes después de la creación.
 * @returns {Promise<Object>} - Retorna el objeto de la escultura creada.
 * @throws {Error} - Lanza un error si ocurre un problema al crear la escultura en la base de datos.
 */
const crearEscultura = async (data, imagenesPre = [], imagenesDurante = [], imagenesPost = []) => {
  try {
    const esculturaData = {
      name: data.name,
      description: data.description,
      creation_date: data.creation_date,
      sculptor: data.sculptor,
      imagenesPre,
      imagenesDurante,
      imagenesPost
    };

    const nuevaEscultura = new Escultura(esculturaData);

    return await nuevaEscultura.save();
  } catch (error) {
    throw new Error(`Error al crear la escultura: ${error.message}`);
  }
};


/**
 * Obtiene todas las esculturas de la base de datos.
 * 
 * @returns {Promise<Array>} - Retorna un array de esculturas.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener las esculturas.
 */
const obtenerEsculturas = async () => {
  try {
    return await Escultura.find();
  } catch (error) {
    throw new Error(`Error al obtener esculturas: ${error.message}`);
  }
};


/**
 * Obtiene una escultura específica por su ID.
 * 
 * @param {string} id - ID de la escultura a obtener.
 * @returns {Promise<Object|null>} - Retorna la escultura encontrada o `null` si no existe.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener la escultura.
 */
const obtenerEsculturaPorId = async (id) => {
  try {
    return await Escultura.findById(id).populate('sculptor');
  } catch (error) {
    throw new Error(`Error al obtener la escultura: ${error.message}`);
  }
};


/**
 * Actualiza una escultura en la base de datos, permitiendo la eliminación y adición de imágenes.
 * 
 * @param {string} id - ID de la escultura a actualizar.
 * @param {Object} data - Datos de la escultura a actualizar.
 * @param {string[]} [nuevasImagenesPre=[]] - URLs de nuevas imágenes previas a la creación.
 * @param {string[]} [nuevasImagenesDurante=[]] - URLs de nuevas imágenes durante la creación.
 * @param {string[]} [nuevasImagenesPost=[]] - URLs de nuevas imágenes posteriores a la creación.
 * @param {string[]} [imagenesAEliminarPre=[]] - URLs de imágenes previas a eliminar.
 * @param {string[]} [imagenesAEliminarDurante=[]] - URLs de imágenes durante la creación a eliminar.
 * @param {string[]} [imagenesAEliminarPost=[]] - URLs de imágenes posteriores a eliminar.
 * @returns {Promise<Object|null>} - Retorna la escultura actualizada o `null` si no se encuentra.
 * @throws {Error} - Lanza un error si ocurre un problema al actualizar la escultura.
 */
const actualizarEscultura = async (
  id,
  data,
  nuevasImagenesPre = [],
  nuevasImagenesDurante = [],
  nuevasImagenesPost = [],
  imagenesAEliminarPre = [],
  imagenesAEliminarDurante = [],
  imagenesAEliminarPost = []
) => {
  try {
    const escultura = await Escultura.findById(id);
    if (!escultura){
      throw new Error('Escultura no encontrada');
    }

    escultura.name = data.name || escultura.name;
    escultura.description = data.description || escultura.description
    escultura.creation_date = data.creation_date || escultura.creation_date;
    escultura.sculptor = data.sculptor || escultura.sculptor;

    if (imagenesAEliminarPre.length > 0) {
      escultura.imagenesPre = escultura.imagenesPre.filter(img => !imagenesAEliminarPre.includes(img));
    }
    if (imagenesAEliminarDurante.length > 0) {
      escultura.imagenesDurante = escultura.imagenesDurante.filter(img => !imagenesAEliminarDurante.includes(img));
    }
    if (imagenesAEliminarPost.length > 0) {
      escultura.imagenesPost = escultura.imagenesPost.filter(img => !imagenesAEliminarPost.includes(img));
    }
    escultura.imagenesPre.push(...nuevasImagenesPre);
    escultura.imagenesDurante.push(...nuevasImagenesDurante);
    escultura.imagenesPost.push(...nuevasImagenesPost);

    return await escultura.save();
  } catch (error) {
    throw new Error(`Error al actualizar la escultura: ${error.message}`);
  }
};


/**
 * Busca esculturas por nombre, de forma parcial e insensible a mayúsculas.
 * 
 * @param {string} nombre - Nombre o parte del nombre de la escultura a buscar.
 * @returns {Promise<Array>} - Retorna un array de esculturas que coinciden con el nombre.
 * @throws {Error} - Lanza un error si ocurre un problema al buscar esculturas por nombre.
 */
const obtenerEsculturasPorNombre = async (nombre) => {
  try {
    const regex = new RegExp(nombre, 'i');
    return await Escultura.find({ name: { $regex: regex } });
  } catch (error) {
    throw new Error(`Error al buscar esculturas por nombre: ${error.message}`);
  }
};


/**
 * Elimina una escultura de la base de datos.
 * 
 * @param {string} id - ID de la escultura a eliminar.
 * @returns {Promise<Object|null>} - Retorna el objeto de la escultura eliminada o `null` si no se encuentra.
 * @throws {Error} - Lanza un error si ocurre un problema al eliminar la escultura.
 */
const eliminarEscultura = async (id) => {
  try {
    return await Escultura.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error al eliminar la escultura: ${error.message}`);
  }
};

module.exports = {
  crearEscultura,
  obtenerEsculturas,
  obtenerEsculturaPorId,
  actualizarEscultura,
  obtenerEsculturasPorNombre,
  eliminarEscultura
};