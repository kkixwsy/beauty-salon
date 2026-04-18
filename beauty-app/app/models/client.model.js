module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    name: { type: Sequelize.STRING(100), allowNull: false },
    phone: { type: Sequelize.STRING(20), unique: true, allowNull: false },
    email: { type: Sequelize.STRING(100) },
    isActive: { type: Sequelize.BOOLEAN, defaultValue: true }
  });
  return Client;
};
