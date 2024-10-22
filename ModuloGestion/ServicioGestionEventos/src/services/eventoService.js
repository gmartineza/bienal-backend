const Evento = require('../db/models/Evento');

exports.crearEvento = async (data) => {
  try {
    const nuevoEvento = new Evento(data); 
    return await nuevoEvento.save();  
  } catch (error) {
    throw new Error('Error al crear el evento: ' + error.message);
  }
};

exports.obtenerEventos = async () => {
  try {
    return await Evento.find();
  } catch (error) {
    throw new Error('Error al obtener los eventos: ' + error.message); 
  }
};

exports.actualizarEvento = async (id, data) => {
  try {
    return await Evento.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  } catch (error) {
    throw new Error('Error al actualizar el evento: ' + error.message);
  }
};

exports.obtenerEventosPorTema = async (theme) => {
  try {

    return await Evento.find({ theme });
  } catch (error) {
    throw new Error('Error al obtener los eventos por tema: ' + error.message);
  }
};

exports.obtenerEventoPorId = async (id) => {
  try {

    return await Evento.findById(id);
  } catch (error) {
    throw new Error('Error al obtener el evento por ID: ' + error.message);
  }
};

exports.eliminarEvento = async (id) => {
  try {
    return await Evento.deleteOne({ _id: id });
  } catch (error) {
    throw new Error('Error al eliminar el evento: ' + error.message);
  }
};
