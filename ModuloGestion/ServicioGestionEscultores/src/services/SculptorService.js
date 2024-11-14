/**
 * Servicio de gestión de escultores.
 * 
 * Proporciona funciones para crear, actualizar, eliminar y consultar escultores en la base de datos.
 * 
 * @module SculptorService
 */
const Sculptor = require('../db/models/sculptor');
const Sculpture = require('../db/models/sculptureModelCopy');

/**
 * Crea un nuevo escultor y actualiza el campo `sculptor` en cada escultura en `works`.
 *
 * @param {Object} sculptorData - Objeto con los datos necesarios para crear el escultor.
 * @returns {Promise<Object>} - Retorna el objeto del escultor creado.
 * @throws {Error} - Lanza un error si ocurre un problema al crear el escultor en la base de datos.
 */
const createSculptor = async (sculptorData) => {
  try {
    const sculptor = new Sculptor(sculptorData);
    await sculptor.save();

    // Actualizar el campo `sculptor` en cada escultura en `works`
    if (sculptorData.works && sculptorData.works.length > 0) {
      await Sculpture.updateMany(
        { _id: { $in: sculptorData.works } },
        { sculptor: sculptor._id }
      );
    }

    return sculptor;
  } catch (error) {
    throw new Error(`Error al crear el escultor: ${error.message}`);
  }
};


/**
 * Obtiene una lista de todos los escultores almacenados en la base de datos.
 *
 * @returns {Promise<Array>} - Retorna un array de objetos de escultores.
 * @throws {Error} - Lanza un error si ocurre un problema al recuperar los escultores.
 */
const getAllSculptors = async () => {
  try {
    const sculptors = await Sculptor.find();
    return sculptors;
  } catch (error) {
    throw new Error(`Error al obtener los escultores: ${error.message}`);
  }
};


/**
 * Obtiene un escultor específico por su ID, incluyendo sus obras.
 *
 * @param {string} id - El ID del escultor a buscar.
 * @returns {Promise<Object|null>} - Retorna el objeto del escultor si se encuentra, o `null` si no existe.
 * @throws {Error} - Lanza un error si ocurre un problema al buscar el escultor por ID.
 */
const getSculptorById = async (id) => {
  try {
    const sculptor = await Sculptor.findById(id).populate('works');
    if (!sculptor) {
      throw new Error('Escultor no encontrado');
    }
    return sculptor;
  } catch (error) {
    throw new Error(`Error al obtener el escultor por ID: ${error.message}`);
  }
};


/**
 * Actualiza un escultor específico y el campo `sculptor` en cada escultura en `works`.
 * 
 * @param {string} id - El ID del escultor a actualizar.
 * @param {Object} updateData - Objeto con los datos actualizados del escultor.
 * @returns {Promise<Object|null>} - Retorna el objeto del escultor actualizado si se encuentra, o `null` si no existe.
 * @throws {Error} - Lanza un error si ocurre un problema al actualizar el escultor.
 */
const updateSculptorById = async (id, updateData) => {
  try {
    // Actualizar el escultor
    const updatedSculptor = await Sculptor.findByIdAndUpdate(id, updateData, { new: true });

    // Si no se encuentra el escultor, retornar null
    if (!updatedSculptor) {
      return null;
    }

    const works = updateData.works || [];

    // 1. Limpiar el campo `sculptor` solo en las esculturas que tienen el `sculptor` igual al ID actual y no están en `works`
    await Sculpture.updateMany(
      { _id: { $nin: works }, sculptor: id },
      { $unset: { sculptor: "" } } // Remueve el campo `sculptor` de esculturas que no están en `works`
    );

    // 2. Asignar el campo `sculptor` en las esculturas presentes en `works`
    await Sculpture.updateMany(
      { _id: { $in: works } },
      { sculptor: id } // Asigna el ID del escultor a cada escultura en `works`
    );

    return updatedSculptor;
  } catch (error) {
    throw new Error(`Error al actualizar el escultor: ${error.message}`);
  }
};

/**
 * Elimina un escultor de la base de datos por su ID.
 *
 * @param {string} id - El ID del escultor a eliminar.
 * @returns {Promise<Object|null>} - Retorna el objeto del escultor eliminado si se encuentra y elimina, o `null` si no existe.
 * @throws {Error} - Lanza un error si ocurre un problema al intentar eliminar el escultor.
 */
const deleteSculptorById = async (id) => {
  try {
    const deletedSculptor = await Sculptor.findByIdAndDelete(id);
    if (!deletedSculptor) {
      throw new Error('Escultor no encontrado');
    }
    return deletedSculptor;
  } catch (error) {
    throw new Error(`Error al eliminar el escultor: ${error.message}`);
  }
};


/**
 * Busca escultores cuyo nombre coincida parcial o completamente
 * con el valor proporcionado, de manera insensible a mayúsculas y minúsculas.
 *
 * @param {string} name - El nombre o parte del nombre del escultor a buscar.
 * @returns {Promise<Array>} - Retorna un array de escultores que coinciden con el criterio de búsqueda.
 * @throws {Error} - Lanza un error si ocurre un problema al realizar la búsqueda.
 */
const searchSculptorByName = async (name) => {
  try {
    const nameRegex = new RegExp(name, 'i');
    const escultores = await Sculptor.find({ name: { $regex: nameRegex } });
    return escultores;
  } catch (error) {
    throw new Error('Error al buscar escultores por nombre: ' + error.message);
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