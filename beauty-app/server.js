const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ alter: true })
  .then(() => console.log("Synced db."))
  .catch(err => console.log("Failed to sync db: " + err.message));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to beauty-salon application." });
});

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Beauty Salon API',
      version: '1.0.0',
      description: 'API documentation for Beauty Salon application',
    },
    servers: [
      {
        url: `http://localhost:${process.env.NODE_DOCKER_PORT || 8080}`,
      },
    ],
  },
  apis: ['./app/routes/*.routes.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Подключение маршрутов API
require("./app/routes/goods.routes")(app);
require("./app/routes/service-category.routes")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/master.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/appointment.routes")(app);

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});