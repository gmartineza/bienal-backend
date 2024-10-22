class EsculturaController {
    constructor(esculturaService) {
      this.esculturaService = esculturaService;
    }
  
    // Manejar la creación de una nueva
    addEscultura(req, res) {
      try {
        const esculturaData = req.body; 
        this.esculturaService.addEscultura(esculturaData);
        res.status(201).json({ message: 'Escultura creada exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Obtener una escultura por nombre
    getEscultura(req, res) {
      try {
        const { name } = req.params; // El nombre se pasa como parámetro en la URL
        const escultura = this.esculturaService.getEsculturas(name);
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
    getAllEsculturas(req, res) {
      try {
        const escultura = this.esculturaService.getAllEsculturas();
        res.status(200).json(escultura);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Actualizar el nombre de la escultura
    updateNombreEscultura(req, res) {
      try {
        const { name } = req.params; // El nombre actual se pasa como parámetro en la URL
        const { newName } = req.body; // El nuevo nombre se envía en el cuerpo de la petición
        this.esculturaService.updateNombreEscultura(name, newName);
        res.status(200).json({ message: 'Nombre de la escultura actualizado exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Actualizar la descripcion de la escultura
    updateEsculturaDescripcion(req, res) {
      try {
        const { name } = req.params;
        const { newDescription} = req.body;
        this.esculturaService.updateEsculturaDescripcion(name, newDescription);
        res.status(200).json({ message: 'Descripcion de la escultura actualizada exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Actualizar fecha Escultura
    updateFechaEscultura(req, res) {
      try {
        const { name } = req.params;
        const { newFecha } = req.body;
        this.sculptorService.updateFechaEscultura(name, newFecha);
        res.status(200).json({ message: 'Fecha de la escultura actualizada exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Eliminar un escultura
    deleteEscultura(req, res) {
      try {
        const { name } = req.params;
        const success = this.esculturaService.deleteEscultura(name);
        if (success) {
          res.status(200).json({ message: 'Escultura eliminada exitosamente.' });
        } else {
          res.status(404).json({ message: 'Escultura no encontrada.' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = EsculturaController;