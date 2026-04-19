module.exports = app => {
  const goods = require("../controllers/goods.controller.js");
  const router = require("express").Router();

  router.post("/", goods.create);
  router.get("/", goods.findAll);
  router.get("/:id", goods.findOne);
  router.put("/:id", goods.update);
  router.delete("/:id", goods.delete);
  router.delete("/", goods.deleteAll);

  app.use("/api/goods", router);
};
