const Sculptor = require('../db/sculptor.model')
const Sculpture = require('../db/sculpture.model');
const Evento = require('../db/evento.model');




/**
 * Realiza una búsqueda por coincidencia en escultores, esculturas y eventos.
 *
 * @async
 * @function search
 * @param {string} term - Término de búsqueda que se usa para encontrar coincidencias parciales en los campos de nombre, país y tema.
 * @returns {Promise<Object>} - Objeto con los resultados de la búsqueda organizados en secciones: sculptors, sculptures y events.
 */

const search = async (term) => {
  const regex = new RegExp(term, 'i'); 

  // Buscamos coincidencias en escultores (solo por nombre y país)
  const sculptorsData = await Sculptor.find({
    $or: [
      { name: regex },
      { country: regex }
    ]
  }).select('_id name profileImage'); 

  // Buscamos coincidencias en esculturas (solo por nombre)
  const sculpturesData = await Sculpture.find({
    name: regex
  }).select('_id name imagenesPre sculptor');

  // Buscamos coincidencias en eventos (solo por nombre y tema)
  const events = await Evento.find({
    $or: [
      { name: regex },
      { theme: regex }
    ]
  }).select('_id name theme');

  // Procesamos esculturas asociadas a escultores encontrados
  let sculptures = [...sculpturesData]; 
  for (const sculptor of sculptorsData) {
    const associatedSculptures = await Sculpture.find({ sculptor: sculptor._id }).select('_id name imagenesPre');
    sculptures = sculptures.concat(associatedSculptures); 
  }

  // Filtramos duplicados en esculturas
  sculptures = Array.from(new Set(sculptures.map(s => s._id.toString()))).map(id =>
    sculptures.find(s => s._id.toString() === id)
  );

  // Procesamos escultores asociados a esculturas encontradas
  let sculptors = [...sculptorsData]; 
  for (const sculpture of sculpturesData) {
    const associatedSculptor = await Sculptor.findById(sculpture.sculptor).select('_id name profileImage');
    if (associatedSculptor) sculptors.push(associatedSculptor); 
  }

  // Filtramos duplicados en escultores
  sculptors = Array.from(new Set(sculptors.map(s => s._id.toString()))).map(id =>
    sculptors.find(s => s._id.toString() === id)
  );

  // Incluimos el nombre del escultor en cada escultura y el nombre de las esculturas en cada escultor
  sculptures = await Promise.all(sculptures.map(async (sculpture) => {
    const sculptor = await Sculptor.findById(sculpture.sculptor).select('name');
    return { 
      _id: sculpture._id,
      name: sculpture.name,
      imagenesPre: sculpture.imagenesPre,
      sculptorName: sculptor ? sculptor.name : null 
    };
  }));

  sculptors = await Promise.all(sculptors.map(async (sculptor) => {
    const works = await Sculpture.find({ sculptor: sculptor._id }).select('name');
    return { 
      _id: sculptor._id,
      name: sculptor.name,
      profileImage: sculptor.profileImage,
      works: works.map(work => work.name) 
    };
  }));

  // Devolvemos los resultados organizados por tipo
  return { 
    sculptors, 
    sculptures, 
    events 
  };
};


module.exports = {
  search
};
