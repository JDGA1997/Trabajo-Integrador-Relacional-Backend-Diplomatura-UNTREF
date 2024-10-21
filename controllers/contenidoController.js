import { Contenido, Actor } from '../models'; // Importar modelos necesarios

// Obtener todos los contenidos
const getAllContenido = async (req, res) => {
    try {
        const contenidos = await Contenido.findAll();
        res.json(contenidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener contenidos' });
    }
};

// Actualizar contenido por ID
const updateContenido = async (req, res) => {
    try {
        const [updated] = await Contenido.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedContenido = await Contenido.findByPk(req.params.id);
            res.status(200).json(updatedContenido);
        } else {
            res.status(404).json({ error: 'Contenido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar contenido' });
    }
};

// Obtener contenido por ID
const getContenidoById = async (req, res) => {
    try {
        const contenido = await Contenido.findByPk(req.params.id);
        if (contenido) {
            res.json(contenido);
        } else {
            res.status(404).json({ error: 'Contenido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener contenido' });
    }
};

// Crear nuevo contenido
const createContenido = async (req, res) => {
    try {
        const nuevoContenido = await Contenido.create(req.body);
        res.status(201).json(nuevoContenido);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear contenido' });
    }
};

// Eliminar contenido por ID
const deleteContenido = async (req, res) => {
    try {
        const deleted = await Contenido.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Contenido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar contenido' });
    }
};

// Filtrar contenido por título
const filterByTitle = async (req, res) => {
    try {
        const contenidos = await Contenido.findAll({
            where: { titulo: req.query.titulo }
        });
        res.json(contenidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar contenidos por título' });
    }
};

// Filtrar contenido por categoría
const filterByCategory = async (req, res) => {
    try {
        const contenidos = await Contenido.findAll({
            where: { categoriaId: req.query.categoria }
        });
        res.json(contenidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar contenidos por categoría' });
    }
};

// Filtrar contenido por género
const filterByGenre = async (req, res) => {
    try {
        const contenidos = await Contenido.findAll({
            where: { generoId: req.query.genero }
        });
        res.json(contenidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar contenidos por género' });
    }
};

// Obtener contenido por título
const getContenidoByTitulo = async (req, res) => {
    try {
        const contenido = await Contenido.findOne({
            where: { titulo: req.params.titulo }
        });
        if (contenido) {
            res.json(contenido);
        } else {
            res.status(404).json({ error: 'Contenido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener contenido por título' });
    }
};

// Obtener contenido por género
const getContenidoByGenero = async (req, res) => {
    try {
        const contenidos = await Contenido.findAll({
            where: { generoId: req.params.id_genero }
        });
        res.json(contenidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener contenidos por género' });
    }
};

// Obtener contenido por categoría
const getContenidoByCategorias = async (req, res) => {
    try {
        const contenidos = await Contenido.findAll({
            where: { categoriaId: req.params.id_categoria }
        });
        res.json(contenidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener contenidos por categoría' });
    }
};

// Obtener contenido con actores
const getContenidoWithActores = async (req, res) => {
    try {
        const contenido = await Contenido.findByPk(req.params.id_contenido, {
            include: [Actor]
        });
        if (contenido) {
            res.json(contenido);
        } else {
            res.status(404).json({ error: 'Contenido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener contenido con actores' });
    }
};

export {
    getAllContenido,
    getContenidoById,
    createContenido,
    updateContenido,
    deleteContenido,
    filterByTitle,
    filterByCategory,
    filterByGenre,
    getContenidoByTitulo,
    getContenidoByGenero,
    getContenidoByCategorias,
    getContenidoWithActores
};