module.exports = (sequelize, Sequelize) => {
  const PricelistGoods = sequelize.define("pricelist_goods", {
    price: { type: Sequelize.DECIMAL(10,2), allowNull: false }
  });
  return PricelistGoods;
};
