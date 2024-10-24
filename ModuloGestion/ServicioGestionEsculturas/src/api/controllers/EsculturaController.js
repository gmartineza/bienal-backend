const esculturaService = require('../../services/eventoService');
  
    // Manejar la creación de una nueva
    exports.addEscultura = async (req, res) => {
      try {
        const esculturaData = req.body; 
        await esculturaService.crearEscultura(esculturaData);
        res.status(201).json({ message: 'Escultura creada exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Obtener una escultura por nombre
    exports.getEsculturaName = async (req, res) => {
      try {
        const { name } = req.params; // El nombre se pasa como parámetro en la URL
        const escultura = await esculturaService.obtenerEsculturasPorNombre(name);
        if (escultura) {
          res.status(200).json(escultura);
        } else {
          res.status(404).json({ message: 'Escultura no encontrada.' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

    // Obtener una escultura por id
    exports.getEsculturaID = async (req, res) => {
      try {
        const { id } = req.params; // El id se pasa como parámetro en la URL
        const escultura = await esculturaService.obtenerEsculturasPorId(id);
        if (escultura) {
          res.status(200).json(escultura);
        } else {
          res.status(404).json({ message: 'Escultura no encontrada.' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Obtener todas las esculturas
    exports.getAllEsculturas = async (req, res) => {
      try {
        const esculturas = await esculturaService.obtenerEsculturas();
        res.status(200).json(esculturas);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Actualizar el nombre de la escultura
    exports.updateNombreEscultura = async (req, res) => {
      try {
        const { name } = req.params; // El nombre actual se pasa como parámetro en la URL
        const { newName } = req.body; // El nuevo nombre se envía en el cuerpo de la petición
        await esculturaService.updateNombreEscultura(name, newName);
        res.status(200).json({ message: 'Nombre de la escultura actualizado exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Actualizar la descripcion de la escultura
    exports.updateEsculturaDescripcion = async (req, res) => {
      try {
        const { name } = req.params;
        const { newDescription} = req.body;
        await esculturaService.updateEsculturaDescripcion(name, newDescription);
        res.status(200).json({ message: 'Descripcion de la escultura actualizada exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Actualizar fecha Escultura
    exports.updateFechaEscultura = async (req, res) => {
      try {
        const { name } = req.params;
        const { newFecha } = req.body;
        await sculptorService.updateFechaEscultura(name, newFecha);
        res.status(200).json({ message: 'Fecha de la escultura actualizada exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Eliminar un escultura
    exports.deleteEscultura = async (req, res) => {
      try {
        const { name } = req.params;
        const success = await esculturaService.deleteEscultura(name);
        if (success) {
          res.status(200).json({ message: 'Escultura eliminada exitosamente.' });
        } else {
          res.status(404).json({ message: 'Escultura no encontrada.' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
  
  module.exports = EsculturaController;