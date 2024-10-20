class SculptorController {
    constructor(sculptorService) {
      this.sculptorService = sculptorService;
    }
  
    // Manejar la creación de un nuevo escultor
    addSculptor(req, res) {
      try {
        const sculptorData = req.body; // Datos del escultor enviados en el cuerpo de la petición
        this.sculptorService.addSculptor(sculptorData);
        res.status(201).json({ message: 'Escultor creado exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Obtener un escultor por nombre
    getSculptor(req, res) {
      try {
        const { name } = req.params; // El nombre se pasa como parámetro en la URL
        const sculptor = this.sculptorService.getSculptor(name);
        if (sculptor) {
          res.status(200).json(sculptor);
        } else {
          res.status(404).json({ message: 'Escultor no encontrado.' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Obtener todos los escultores
    getAllSculptors(req, res) {
      try {
        const sculptors = this.sculptorService.getAllSculptors();
        res.status(200).json(sculptors);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Actualizar el nombre de un escultor
    updateSculptorName(req, res) {
      try {
        const { name } = req.params; // El nombre actual se pasa como parámetro en la URL
        const { newName } = req.body; // El nuevo nombre se envía en el cuerpo de la petición
        this.sculptorService.updateSculptorName(name, newName);
        res.status(200).json({ message: 'Nombre del escultor actualizado exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Actualizar la biografía de un escultor
    updateSculptorBiography(req, res) {
      try {
        const { name } = req.params;
        const { newBiography } = req.body;
        this.sculptorService.updateSculptorBiography(name, newBiography);
        res.status(200).json({ message: 'Biografía del escultor actualizada exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Actualizar el contacto de un escultor
    updateSculptorContact(req, res) {
      try {
        const { name } = req.params;
        const { newContact } = req.body;
        this.sculptorService.updateSculptorContact(name, newContact);
        res.status(200).json({ message: 'Contacto del escultor actualizado exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Actualizar las obras de un escultor
    updateSculptorWorks(req, res) {
      try {
        const { name } = req.params;
        const { newWorks } = req.body;
        this.sculptorService.updateSculptorWorks(name, newWorks);
        res.status(200).json({ message: 'Obras del escultor actualizadas exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    // Eliminar un escultor
    deleteSculptor(req, res) {
      try {
        const { name } = req.params;
        const success = this.sculptorService.deleteSculptor(name);
        if (success) {
          res.status(200).json({ message: 'Escultor eliminado exitosamente.' });
        } else {
          res.status(404).json({ message: 'Escultor no encontrado.' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = SculptorController;