const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to beauty-salon application." });
});

const PORT = process.env.NODE_DOCKER_PORT || 8080;
const db = require("./app/models");
db.sequelize.sync()
  .then(() => console.log("Synced db."))
  .catch(err => console.log("Failed to sync db: " + err.message));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});