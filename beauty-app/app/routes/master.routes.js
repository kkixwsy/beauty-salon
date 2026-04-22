/**
 * @swagger
 * components:
 *   schemas:
 *     Master:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Анна Иванова
 *         phone:
 *           type: string
 *           example: +79123456789
 *         specialization:
 *           type: string
 *           example: Парикмахер
 *         experience:
 *           type: integer
 *           example: 5
 *         rating:
 *           type: number
 *           example: 4.8
 *         isActive:
 *           type: boolean
 *           example: true
 */

module.exports = app => {
  const master = require("../controllers/master.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/masters:
   *   post:
   *     summary: Создать нового мастера
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Master'
   *     responses:
   *       200:
   *         description: Успешно создано
   */
  router.post("/", master.create);

  /**
   * @swagger
   * /api/masters:
   *   get:
   *     summary: Получить список всех мастеров
   *     responses:
   *       200:
   *         description: Список мастеров
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Master'
   */
  router.get("/", master.findAll);

  /**
   * @swagger
   * /api/masters/{id}:
   *   get:
   *     summary: Получить мастера по ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Данные мастера
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Master'
   *       404:
   *         description: Мастер не найден
   */
  router.get("/:id", master.findOne);

  /**
   * @swagger
   * /api/masters/{id}:
   *   put:
   *     summary: Обновить данные мастера
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Master'
   *     responses:
   *       200:
   *         description: Успешно обновлено
   */
  router.put("/:id", master.update);

  /**
   * @swagger
   * /api/masters/{id}:
   *   delete:
   *     summary: Удалить мастера
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Успешно удалено
   */
  router.delete("/:id", master.delete);

  router.delete("/", master.deleteAll);

  app.use("/api/masters", router);
};