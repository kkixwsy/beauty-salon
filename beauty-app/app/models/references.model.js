module.exports = (db) => {
    db.pricelist.hasMany(db.pricelistGoods, { foreignKey: 'pricelistId' });
    db.pricelistGoods.belongsTo(db.pricelist, { foreignKey: 'pricelistId' });

    db.goods.hasMany(db.pricelistGoods, { foreignKey: 'goodsId' });
    db.pricelistGoods.belongsTo(db.goods, { foreignKey: 'goodsId' });
};
