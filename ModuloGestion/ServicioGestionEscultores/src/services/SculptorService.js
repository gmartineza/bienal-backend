const Sculptor  = require('../db/models/sculptureModel');

const createSculptor = async (sculptorData) => {
  try {
    const sculptor = new Sculptor(sculptorData);
    await sculptor.save();
    return sculptor;
  } catch (error) {
    throw error;
  }
};

const getAllSculptors = async () => {
  try {
    const sculptors = await Sculptor.find(); 
    return sculptors;
  } catch (error) {
    throw error;
  }
};

const getSculptorById = async (id) => {
  try {
    const sculptor = await Sculptor.findById(id).populate('works');
    return sculptor;
  } catch (error) {
    throw error;
  }
};

const updateSculptorById = async (id, sculptorData) => {
  try {
    const updatedSculptor = await Sculptor.findByIdAndUpdate(id, sculptorData, { new: true });
    return updatedSculptor;
  } catch (error) {
    throw error;
  }
};

const deleteSculptorById = async (id) => {
  try {
    const deletedSculptor = await Sculptor.findByIdAndDelete(id);
    return deletedSculptor;
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
