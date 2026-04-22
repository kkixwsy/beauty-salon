/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Стрижки
 *         code:
 *           type: string
 *           example: HAIRCUT
 *         description:
 *           type: string
 *           example: Все виды стрижек
 *         sortOrder:
 *           type: integer
 *           example: 1
 *         isActive:
 *           type: boolean
 *           example: true
 */

module.exports = app => {
  const controller = require("../controllers/service-category.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/service-categories:
   *   post:
   *     summary: Создать новую категорию услуг
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ServiceCategory'
   *     responses:
   *       200:
   *         description: Успешно создано
   *       400:
   *         description: Ошибка валидации
   */
  router.post("/", controller.create);

  /**
   * @swagger
   * /api/service-categories:
   *   get:
   *     summary: Получить список всех категорий
   *     responses:
   *       200:
   *         description: Список категорий
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ServiceCategory'
   */
  router.get("/", controller.findAll);

  /**
   * @swagger
   * /api/service-categories/{id}:
   *   get:
   *     summary: Получить категорию по ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Данные категории
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ServiceCategory'
   *       404:
   *         description: Категория не найдена
   */
  router.get("/:id", controller.findOne);

  /**
   * @swagger
   * /api/service-categories/{id}:
   *   put:
   *     summary: Обновить категорию
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
   *             $ref: '#/components/schemas/ServiceCategory'
   *     responses:
   *       200:
   *         description: Успешно обновлено
   *       404:
   *         description: Категория не найдена
   */
  router.put("/:id", controller.update);

  /**
   * @swagger
   * /api/service-categories/{id}:
   *   delete:
   *     summary: Удалить категорию
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Успешно удалено
   *       404:
   *         description: Категория не найдена
   */
  router.delete("/:id", controller.delete);

  router.delete("/", controller.deleteAll);

  app.use("/api/service-categories", router);
};