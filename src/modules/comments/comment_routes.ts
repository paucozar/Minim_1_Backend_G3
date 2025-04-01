import express from 'express';
import { createCommentHandler, getAllCommentsHandler, updateCommentHandler, deleteCommentHandler } from './comment_controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/comments/create:
 *   post:
 *     summary: Crea un nuevo comentario
 *     description: Añade los detalles de un nuevo comentario.
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               gymId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 */
router.post('/comments/create', createCommentHandler);

/**
 * @openapi
 * /api/comments:
 *   get:
 *     summary: Obtiene todos los comentarios
 *     description: Retorna una lista de todos los comentarios.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Número de página para la paginación (por defecto 1)
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *         description: Tamaño de página para la paginación (por defecto 10)
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente
 */
router.get('/comments', getAllCommentsHandler);

/**
 * @openapi
 * /api/comments/{id}:
 *   put:
 *     summary: Actualiza un comentario
 *     description: Actualiza los detalles de un comentario existente.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
 */
router.put('/comments/:id', updateCommentHandler);

/**
 * @openapi
 * /api/comments/{id}:
 *   delete:
 *     summary: Elimina un comentario
 *     description: Elimina un comentario existente.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 */
router.delete('/comments/:id', deleteCommentHandler);

export default router;