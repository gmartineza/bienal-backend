const searchService = require('../../services/search.service');




/**
 * Controlador para realizar la búsqueda en escultores, esculturas y eventos.
 *
 * @async
 * @function search
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud con el término de búsqueda.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Retorna un objeto JSON con los resultados de la búsqueda.
 */

const search = async (req, res) => {
    try {
      const { term } = req.body; // Obtener el término del body
      const results = await searchService.search(term);
      res.status(200).json(results);
    } catch (error) {
      throw error;
    }
  };

module.exports = {
  search
};
