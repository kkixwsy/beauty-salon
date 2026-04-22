/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Мария Петрова
 *         phone:
 *           type: string
 *           example: +79998887766
 *         email:
 *           type: string
 *           example: maria@example.com
 *         birthDate:
 *           type: string
 *           format: date
 *           example: 1990-05-15
 *         loyaltyPoints:
 *           type: integer
 *           example: 100
 *         isActive:
 *           type: boolean
 *           example: true
 */

module.exports = app => {
  const client = require("../controllers/client.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/clients:
   *   post:
   *     summary: Создать нового клиента
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Client'
   *     responses:
   *       200:
   *         description: Успешно создано
   */
  router.post("/", client.create);

  /**
   * @swagger
   * /api/clients:
   *   get:
   *     summary: Получить список всех клиентов
   *     responses:
   *       200:
   *         description: Список клиентов
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Client'
   */
  router.get("/", client.findAll);

  /**
   * @swagger
   * /api/clients/{id}:
   *   get:
   *     summary: Получить клиента по ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Данные клиента
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Client'
   *       404:
   *         description: Клиент не найден
   */
  router.get("/:id", client.findOne);

  /**
   * @swagger
   * /api/clients/{id}:
   *   put:
   *     summary: Обновить данные клиента
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
   *             $ref: '#/components/schemas/Client'
   *     responses:
   *       200:
   *         description: Успешно обновлено
   */
  router.put("/:id", client.update);

  /**
   * @swagger
   * /api/clients/{id}:
   *   delete:
   *     summary: Удалить клиента
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
  router.delete("/:id", client.delete);

  router.delete("/", client.deleteAll);

  app.use("/api/clients", router);
};