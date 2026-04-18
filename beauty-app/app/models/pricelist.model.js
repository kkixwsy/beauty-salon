module.exports = (sequelize, Sequelize) => {
  const Pricelist = sequelize.define("pricelist", {
    name: { type: Sequelize.STRING(100), allowNull: false },
    startDate: { type: Sequelize.DATEONLY, allowNull: false },
    endDate: { type: Sequelize.DATEONLY },
    isActive: { type: Sequelize.BOOLEAN, defaultValue: true }
  });
  return Pricelist;
};
