module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define("service", {
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DECIMAL(10, 2)
    },
    duration: {
      type: Sequelize.INTEGER
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });
  return Service;
};