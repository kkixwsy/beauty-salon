module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define("service", {
    name: { type: Sequelize.STRING(100), allowNull: false },
    price: { type: Sequelize.DECIMAL(10,2), allowNull: false },
    duration: { type: Sequelize.INTEGER },
    isActive: { type: Sequelize.BOOLEAN, defaultValue: true }
  });
  return Service;
};
