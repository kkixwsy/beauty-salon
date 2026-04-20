module.exports = (sequelize, Sequelize) => {
  const Goods = sequelize.define("goods", {
    name: { type: Sequelize.STRING(100), allowNull: false },
    basePrice: { type: Sequelize.DECIMAL(10,2), allowNull: false },
    duration: { type: Sequelize.INTEGER, comment: "Длительность в минутах" },
    isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
    serviceCategoryId: { type: Sequelize.INTEGER, allowNull: true }  // ← ДОБАВИТЬ ЭТУ СТРОКУ
  });
  return Goods;
};