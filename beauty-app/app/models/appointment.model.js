module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointment", {
    dateTime: { type: Sequelize.DATE, allowNull: false },
    status: { type: Sequelize.STRING, defaultValue: "pending" },
    totalPrice: { type: Sequelize.DECIMAL(10,2) }
  });
  return Appointment;
};
