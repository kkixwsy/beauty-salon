const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Модели
db.serviceCategory = require("./service-category.model.js")(sequelize, Sequelize);
db.service = require("./service.model.js")(sequelize, Sequelize);
db.master = require("./master.model.js")(sequelize, Sequelize);
db.client = require("./client.model.js")(sequelize, Sequelize);
db.appointment = require("./appointment.model.js")(sequelize, Sequelize);
db.appointmentService = require("./appointment-service.model.js")(sequelize, Sequelize);
db.goods = require("./goods.model.js")(sequelize, Sequelize);
db.pricelist = require("./pricelist.model.js")(sequelize, Sequelize);
db.pricelistGoods = require("./pricelistgoods.model.js")(sequelize, Sequelize);
db.purchase = require("./purchase.model.js")(sequelize, Sequelize);
require("./references.model.js")(db);

module.exports = db;
