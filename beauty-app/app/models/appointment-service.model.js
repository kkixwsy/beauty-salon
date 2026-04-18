module.exports = (sequelize, Sequelize) => {
  const AppointmentService = sequelize.define("appointment_service", {
    quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
    price: { type: Sequelize.DECIMAL(10,2), allowNull: false }
  });
  return AppointmentService;
};
