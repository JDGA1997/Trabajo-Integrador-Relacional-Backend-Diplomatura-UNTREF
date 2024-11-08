import { Router } from 'express';
import {
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
} from '../controllers/contenidoController.js';

/**
 * Crea una nueva instancia del enrutador.
 * 
 * @constant
 * @type {Router}
 */
const router = Router();

router.get('/', getAllContenido);
router.get('/:id', getContenidoById);
router.post('/', createContenido);
router.put('/:id', updateContenido);
router.delete('/:id', deleteContenido);
router.get('/titulo/:titulo', getContenidoByTitulo);
router.get('/genero/:id_genero', getContenidoByGenero);
router.get('/categoria/:id_categoria', getContenidoByCategorias);
router.get('/actores/:id_contenido', getContenidoWithActores);
router.get('/filtrar/titulo', filterByTitle);
router.get('/filtrar/categoria', filterByCategory);
router.get('/filtrar/genero', filterByGenre);

export default router;
