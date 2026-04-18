module.exports = (sequelize, Sequelize) => {
  const ServiceCategory = sequelize.define("service_category", {
    name: { type: Sequelize.STRING(100), allowNull: false },
    code: { type: Sequelize.STRING(20), unique: true, allowNull: false },
    isActive: { type: Sequelize.BOOLEAN, defaultValue: true }
  });
  return ServiceCategory;
};
