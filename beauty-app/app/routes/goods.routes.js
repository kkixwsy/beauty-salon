/**
 * @swagger
 * components:
 *   schemas:
 *     Goods:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Стрижка женская
 *         basePrice:
 *           type: number
 *           example: 1500
 *         duration:
 *           type: integer
 *           example: 60
 *         isActive:
 *           type: boolean
 *           example: true
 */

module.exports = app => {
  const goods = require("../controllers/goods.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/goods:
   *   post:
   *     summary: Создать новый товар/услугу
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Goods'
   *     responses:
   *       200:
   *         description: Успешно создано
   *       400:
   *         description: Ошибка валидации
   */
  router.post("/", goods.create);

  /**
   * @swagger
   * /api/goods:
   *   get:
   *     summary: Получить список всех товаров/услуг
   *     responses:
   *       200:
   *         description: Список товаров
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Goods'
   */
  router.get("/", goods.findAll);

  /**
   * @swagger
   * /api/goods/{id}:
   *   get:
   *     summary: Получить товар по ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID товара
   *     responses:
   *       200:
   *         description: Данные товара
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Goods'
   *       404:
   *         description: Товар не найден
   */
  router.get("/:id", goods.findOne);

  /**
   * @swagger
   * /api/goods/{id}:
   *   put:
   *     summary: Обновить товар
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
   *             $ref: '#/components/schemas/Goods'
   *     responses:
   *       200:
   *         description: Успешно обновлено
   *       404:
   *         description: Товар не найден
   */
  router.put("/:id", goods.update);

  /**
   * @swagger
   * /api/goods/{id}:
   *   delete:
   *     summary: Удалить товар
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
   *         description: Товар не найден
   */
  router.delete("/:id", goods.delete);

  router.delete("/", goods.deleteAll);
  router.get("/:id/goodsgroupname", goods.getGoodsGroupName);
  router.get("/:id/goodsgroup", goods.getGoodsGroup);

  app.use("/api/goods", router);
};