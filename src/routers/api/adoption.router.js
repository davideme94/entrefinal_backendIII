import express from "express";
import { createAdoption, getAdoptions } from "../../controllers/adoption.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Endpoints para gestionar adopciones
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", getAdoptions);

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID del usuario
 *               pet:
 *                 type: string
 *                 description: ID de la mascota
 *     responses:
 *       201:
 *         description: Adopción creada exitosamente
 */
router.post("/", createAdoption);

export default router;
