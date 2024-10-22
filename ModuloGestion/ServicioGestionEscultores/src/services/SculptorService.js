class SculptorUseCase {
    constructor(sculptorRepository) {
      this.sculptorRepository = sculptorRepository;
    }
  
    addSculptor(sculptor) {
      this.sculptorRepository.add(sculptor);
    }
  
    getSculptor(name) {
      return this.sculptorRepository.getAll().find(sculptor => sculptor.name === name) || null;
    }
  
    getAllSculptors() {
      return this.sculptorRepository.getAll();
    }

    updateSculptorName(name, newName) {
      const updatedSculptor = this.sculptorRepository.getAll().find(sculptor => sculptor.name == name);
      if (updatedSculptor) {
        updatedSculptor.setName(newName); // Cambiar el nombre del escultor
        this.sculptorRepository.update(name, updatedSculptor); // Actualizar el escultor en el repositorio
      } else {
        throw new Error('Escultor no encontrado');
      }
    }
  
    updateSculptorBiography(name, newBiography) {
      const updatedSculptor = this.sculptorRepository.getAll().find(sculptor => sculptor.name == name);
      if (updatedSculptor) {
        updatedSculptor.setBiography(newBiography);
        this.sculptorRepository.update(name, updatedSculptor);
      } else {
        throw new Error('Escultor no encontrado');
      }
    }
  
    updateSculptorContact(name, newContact) {
      const updatedSculptor = this.sculptorRepository.getAll().find(sculptor => sculptor.name == name);
      if (updatedSculptor) {
        updatedSculptor.setContact(newContact);
        this.sculptorRepository.update(name, updatedSculptor);
      } else {
        throw new Error('Escultor no encontrado');
      }
    }
  
    updateSculptorWorks(name, newWorks) {
      const updatedSculptor = this.sculptorRepository.getAll().find(sculptor => sculptor.name == name);
      if (updatedSculptor) {
        updatedSculptor.setWorks(newWorks);
        this.sculptorRepository.update(name, updatedSculptor);
      } else {
        throw new Error('Escultor no encontrado');
      }
    }  

    deleteSculptor(name) {
      const sculptor = this.sculptorRepository.getAll().find(sculptor => sculptor.name == name);
      if (sculptor) {
        this.sculptorRepository.delete(name);
        return true;
      }
      return false;
    }
  }
  
  module.exports = SculptorUseCase;