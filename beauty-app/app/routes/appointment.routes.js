module.exports = app => {
  const appointment = require("../controllers/appointment.controller.js");
  const router = require("express").Router();

  router.post("/", appointment.create);
  router.get("/", appointment.findAll);
  router.get("/:id", appointment.findOne);
  router.put("/:id", appointment.update);
  router.delete("/:id", appointment.delete);
  router.delete("/", appointment.deleteAll);

  app.use("/api/appointments", router);
};
