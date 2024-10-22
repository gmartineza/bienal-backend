const eventoService = require('../../services/eventoService');

exports.crearEvento = async (req, res) => {
  try {
    const nuevoEvento = await eventoService.crearEvento(req.body);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el evento' });
  }
};

exports.obtenerEventos = async (req, res) => {
  try {
    const eventos = await eventoService.obtenerEventos();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
};

exports.obtenerEventoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await eventoService.obtenerEventoPorId(id);

    if (!evento) {
      return res.status(404).json({ error: 'No se encontró un evento con ese ID' });
    }

    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el evento por ID' });
  }
};

exports.obtenerEventosPorTema = async (req, res) => {
  try {
    const { theme } = req.body;
    const eventos = await eventoService.obtenerEventosPorTema(theme);

    if (eventos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron eventos con esa temática' });
    }

    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos por tema' });
  }
};


exports.actualizarEvento = async (req, res) => {
  try {
    const { id } = req.params; 
    const eventoActualizado = await eventoService.actualizarEvento(id, req.body);

    if (!eventoActualizado) {
      return res.status(404).json({ error: 'No se encontró un evento con ese ID para actualizar' });
    }

    res.status(200).json(eventoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
};


exports.eliminarEvento = async (req, res) => {
  try {
    const { id } = req.params; 
    const resultado = await eventoService.eliminarEvento(id);

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ error: 'No se encontró un evento con ese ID para eliminar' });
    }

    res.status(200).json({ mensaje: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
};
