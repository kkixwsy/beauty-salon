/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         dateTime:
 *           type: string
 *           format: date-time
 *           example: 2026-04-25T14:00:00
 *         status:
 *           type: string
 *           enum: [pending, confirmed, completed, cancelled]
 *           example: confirmed
 *         totalPrice:
 *           type: number
 *           example: 1500
 *         comment:
 *           type: string
 *           example: Первое посещение
 *         clientId:
 *           type: integer
 *           example: 1
 *         masterId:
 *           type: integer
 *           example: 1
 */

module.exports = app => {
  const appointment = require("../controllers/appointment.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/appointments:
   *   post:
   *     summary: Создать новую запись
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Appointment'
   *     responses:
   *       200:
   *         description: Успешно создано
   */
  router.post("/", appointment.create);

  /**
   * @swagger
   * /api/appointments:
   *   get:
   *     summary: Получить список всех записей
   *     responses:
   *       200:
   *         description: Список записей
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Appointment'
   */
  router.get("/", appointment.findAll);

  /**
   * @swagger
   * /api/appointments/today/count:
   *   get:
   *     summary: Получить количество записей на сегодня
   *     responses:
   *       200:
   *         description: Количество записей
   */
  router.get("/today/count", appointment.getTodayCount);

  /**
   * @swagger
   * /api/appointments/{id}:
   *   get:
   *     summary: Получить запись по ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Данные записи
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Appointment'
   *       404:
   *         description: Запись не найдена
   */
  router.get("/:id", appointment.findOne);

  /**
   * @swagger
   * /api/appointments/{id}:
   *   put:
   *     summary: Обновить запись
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
   *             $ref: '#/components/schemas/Appointment'
   *     responses:
   *       200:
   *         description: Успешно обновлено
   */
  router.put("/:id", appointment.update);

  /**
   * @swagger
   * /api/appointments/{id}:
   *   delete:
   *     summary: Удалить запись
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
  router.delete("/:id", appointment.delete);

  router.delete("/", appointment.deleteAll);

  app.use("/api/appointments", router);
};