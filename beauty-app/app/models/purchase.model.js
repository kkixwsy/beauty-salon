module.exports = (sequelize, Sequelize) => {
  const Purchase = sequelize.define("purchase", {
    purchaseDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    totalAmount: { type: Sequelize.DECIMAL(10,2), allowNull: false },
    status: { type: Sequelize.STRING, defaultValue: "completed" }
  });
  return Purchase;
};
