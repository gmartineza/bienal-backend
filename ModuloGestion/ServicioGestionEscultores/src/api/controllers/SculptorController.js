const sculptorService = require('../../services/sculptorService');

const createSculptor = async (req, res) => {
  try {
    const sculptor = await sculptorService.createSculptor(req.body);
    res.status(201).json(sculptor);
  } catch (error) {
    throw error;
  }
};

const getAllSculptors = async (req, res) => {
  try {
    const sculptors = await sculptorService.getAllSculptors();
    res.status(200).json(sculptors);
  } catch (error) {
    throw error;
  }
};

const getSculptorById = async (req, res) => {
  try {
    const sculptor = await sculptorService.getSculptorById(req.params.id);
    if (!sculptor) {
      return res.status(404).json({ message: 'Escultor no encontrado' });
    }
    res.status(200).json(sculptor);
  } catch (error) {
    throw error;
  }
};

const updateSculptorById = async (req, res) => {
  try {
    const sculptor = await sculptorService.updateSculptorById(req.params.id, req.body);
    if (!sculptor) {
      return res.status(404).json({ message: 'Escultor no encontrado' });
    }
    res.status(200).json(sculptor);
  } catch (error) {
    throw error;
  }
};

const deleteSculptorById = async (req, res) => {
  try {
    const sculptor = await sculptorService.deleteSculptorById(req.params.id);
    if (!sculptor) {
      return res.status(404).json({ message: 'Escultor no encontrado' });
    }
    res.status(200).json({ message: 'Escultor eliminado correctamente' });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSculptor,
  getAllSculptors,
  getSculptorById,
  updateSculptorById,
  deleteSculptorById,
};