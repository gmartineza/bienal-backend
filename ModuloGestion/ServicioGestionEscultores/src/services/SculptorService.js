/**
 * Servicio de gestión de escultores.
 * 
 * Proporciona funciones para crear, actualizar, eliminar y consultar escultores en la base de datos.
 * 
 * @module SculptorService
 */
const Sculptor = require('../db/models/sculptor');

/**
 * Crea un nuevo escultor en la base de datos.
 * 
 * @param {Object} sculptorData - Objeto con los datos necesarios para crear el escultor.
 * @returns {Promise<Object>} - Retorna el objeto del escultor creado.
 * @throws {Error} - Lanza un error si ocurre un problema al crear el escultor en la base de datos.
 */
const createSculptor = async (sculptorData) => {
  try {
    const sculptor = new Sculptor(sculptorData);
    await sculptor.save();
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
    const sculptor = await Sculptor.findById(id);
    if (!sculptor) {
      throw new Error('Escultor no encontrado');
    }
    return sculptor;
  } catch (error) {
    throw new Error(`Error al obtener el escultor por ID: ${error.message}`);
  }
};


/**
 * Actualiza un escultor específico por su ID en la base de datos.
 * Maneja la adición y eliminación de esculturas en el campo `works`.
 * 
 * @param {string} id - El ID del escultor a actualizar.
 * @param {Object} updateData - Objeto con los datos actualizados del escultor.
 * @returns {Promise<Object|null>} - Retorna el objeto del escultor actualizado si se encuentra, o `null` si no existe.
 * @throws {Error} - Lanza un error si ocurre un problema al actualizar el escultor.
 */
const updateSculptorById = async (id, updateData) => {
  try {
    const updatedSculptor = await Sculptor.findByIdAndUpdate(id, updateData, { new: true });
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