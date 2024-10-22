const db = require('your-db-connection');

class SculptorRepository {
  // Agregar un nuevo escultor
  async add(sculptor) {
    await db.query('INSERT INTO sculptors (name, biography, contact, works) VALUES (?, ?, ?, ?)', 
      [sculptor.name, sculptor.biography, sculptor.contact, JSON.stringify(sculptor.works)]);
  }

  // Obtener todos los escultores
  async getAll() {
    const [rows] = await db.query('SELECT * FROM sculptors');
    return rows.map(row => ({
      name: row.name,
      biography: row.biography,
      contact: row.contact,
      works: JSON.parse(row.works)
    }));
  }

  // Actualizar un escultor por su nombre
  async update(name, updatedSculptor) {
    await db.query('UPDATE sculptors SET name = ?, biography = ?, contact = ?, works = ? WHERE name = ?', 
      [updatedSculptor.name, updatedSculptor.biography, updatedSculptor.contact, JSON.stringify(updatedSculptor.works), name]);
  }

  // Eliminar un escultor por su nombre
  async delete(name) {
    await db.query('DELETE FROM sculptors WHERE name = ?', [name]);
  }
}

module.exports = SculptorRepository;