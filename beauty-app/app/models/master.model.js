module.exports = (sequelize, Sequelize) => {
  const Master = sequelize.define("master", {
    name: { type: Sequelize.STRING(100), allowNull: false },
    phone: { type: Sequelize.STRING(20), unique: true },
    specialization: { type: Sequelize.STRING(200) },
    isActive: { type: Sequelize.BOOLEAN, defaultValue: true }
  });
  return Master;
};
