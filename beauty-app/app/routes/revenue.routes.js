module.exports = app => {
  const revenue = require("../controllers/revenue.controller.js");
  const router = require("express").Router();

  router.get("/total", revenue.getTotalRevenue);

  app.use("/api/revenue", router);
};