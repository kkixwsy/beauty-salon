module.exports = app => {
  const service = require("../controllers/service.controller.js");
  const router = require("express").Router();

  router.post("/", service.create);
  router.get("/", service.findAll);
  router.get("/popular", service.getPopularServices);
  router.get("/:id", service.findOne);
  router.put("/:id", service.update);
  router.delete("/:id", service.delete);
  router.delete("/", service.deleteAll);

  app.use("/api/services", router);
};
