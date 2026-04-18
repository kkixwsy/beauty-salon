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

// Связи
db.serviceCategory.hasMany(db.service, { foreignKey: "serviceCategoryId" });
db.service.belongsTo(db.serviceCategory, { foreignKey: "serviceCategoryId" });

db.master.hasMany(db.appointment, { foreignKey: "masterId" });
db.appointment.belongsTo(db.master, { foreignKey: "masterId" });

db.client.hasMany(db.appointment, { foreignKey: "clientId" });
db.appointment.belongsTo(db.client, { foreignKey: "clientId" });

db.appointment.belongsToMany(db.service, { through: db.appointmentService, foreignKey: "appointmentId" });
db.service.belongsToMany(db.appointment, { through: db.appointmentService, foreignKey: "serviceId" });

module.exports = db;
