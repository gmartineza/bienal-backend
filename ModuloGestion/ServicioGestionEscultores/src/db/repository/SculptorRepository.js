class SculptorRepository {
    constructor() {
      // Almacén temporal de escultores
      this.sculptors = [];
    }
  
    // Agregar un nuevo escultor
    add(sculptor) {
      this.sculptors.push(sculptor);
    }
  
    // Obtener todos los escultores
    getAll() {
      return this.sculptors;
    }
  
    // Actualizar un escultor por su nombre
    update(name, updatedSculptor) {
      const index = this.sculptors.findIndex(sculptor => sculptor.name === name);
      if (index !== -1) {
        this.sculptors[index] = updatedSculptor;
      } else {
        throw new Error('Escultor no encontrado');
      }
    }
  
    // Eliminar un escultor por su nombre
    delete(name) {
      const index = this.sculptors.findIndex(sculptor => sculptor.name === name);
      if (index !== -1) {
        this.sculptors.splice(index, 1); // Eliminar escultor del array
      } else {
        throw new Error('Escultor no encontrado');
      }
    }
  }
  
  module.exports = SculptorRepository;