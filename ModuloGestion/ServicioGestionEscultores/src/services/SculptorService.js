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

module.exports = {
  createSculptor,
  getAllSculptors,
  getSculptorById,
};
