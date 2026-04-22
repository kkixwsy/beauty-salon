/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Стрижка женская
 *         price:
 *           type: number
 *           example: 1500
 *         duration:
 *           type: integer
 *           example: 60
 *         description:
 *           type: string
 *           example: Полная стрижка с укладкой
 *         isActive:
 *           type: boolean
 *           example: true
 *         serviceCategoryId:
 *           type: integer
 *           example: 1
 */

module.exports = app => {
  const service = require("../controllers/service.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/services:
   *   post:
   *     summary: Создать новую услугу
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Service'
   *     responses:
   *       200:
   *         description: Успешно создано
   */
  router.post("/", service.create);

  /**
   * @swagger
   * /api/services:
   *   get:
   *     summary: Получить список всех услуг
   *     responses:
   *       200:
   *         description: Список услуг
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Service'
   */
  router.get("/", service.findAll);

  /**
   * @swagger
   * /api/services/popular:
   *   get:
   *     summary: Получить топ-5 популярных услуг
   *     responses:
   *       200:
   *         description: Список популярных услуг
   */
  router.get("/popular", service.getPopularServices);

  /**
   * @swagger
   * /api/services/{id}:
   *   get:
   *     summary: Получить услугу по ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Данные услуги
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Service'
   *       404:
   *         description: Услуга не найдена
   */
  router.get("/:id", service.findOne);

  /**
   * @swagger
   * /api/services/{id}:
   *   put:
   *     summary: Обновить услугу
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
   *             $ref: '#/components/schemas/Service'
   *     responses:
   *       200:
   *         description: Успешно обновлено
   */
  router.put("/:id", service.update);

  /**
   * @swagger
   * /api/services/{id}:
   *   delete:
   *     summary: Удалить услугу
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
  router.delete("/:id", service.delete);

  router.delete("/", service.deleteAll);

  app.use("/api/services", router);
};