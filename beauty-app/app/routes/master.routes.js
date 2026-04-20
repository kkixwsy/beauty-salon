module.exports = app => {
  const master = require("../controllers/master.controller.js");
  const router = require("express").Router();

  router.post("/", master.create);
  router.get("/", master.findAll);
  router.get("/:id", master.findOne);
  router.put("/:id", master.update);
  router.delete("/:id", master.delete);
  router.delete("/", master.deleteAll);

  app.use("/api/masters", router);
};