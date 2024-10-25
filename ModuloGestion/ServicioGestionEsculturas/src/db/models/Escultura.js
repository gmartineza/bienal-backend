class Escultura {
    constructor(name, descripcion, fecha, ) {
      this.name = name;
      this.descripcion = descripcion;
      this.fecha = fecha;
    }
  
    // Métodos setters
    setName(name) {
      this.name = name;
    }
  
    setDescripcion(descripcion) {
      this.descripcion = descripcion;
    }
  
    setFecha (fecha ) {
      this.fecha  = fecha ;
    }
  }
  
  module.exports = Escultura;