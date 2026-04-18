module.exports = app => {
  const services = require("../controllers/service.controller.js");
  const router = require("express").Router();

  // Создать новую услугу
  router.post("/", services.create);

  // Получить все услуги
  router.get("/", services.findAll);

  // Получить все активные услуги
  router.get("/active", services.findAllActive);

  // Получить одну услугу по id
  router.get("/:id", services.findOne);

  // Обновить услугу
  router.put("/:id", services.update);

  // Удалить услугу
  router.delete("/:id", services.delete);

  // Удалить все услуги
  router.delete("/", services.deleteAll);

  app.use("/api/services", router);
};