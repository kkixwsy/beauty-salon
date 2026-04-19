const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключение к базе данных
const db = require("./app/models");
db.sequelize.sync({ alter: true })
  .then(() => console.log("Synced db."))
  .catch(err => console.log("Failed to sync db: " + err.message));

// Простой маршрут для проверки
app.get("/", (req, res) => {
  res.json({ message: "Welcome to beauty-salon application." });
});

// Подключение маршрутов API (только существующие)
require("./app/routes/goods.routes")(app);
require("./app/routes/service-category.routes")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/master.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/appointment.routes")(app);
require("./app/routes/pricelist.routes")(app);
require("./app/routes/purchase.routes")(app);

// Установка порта
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
