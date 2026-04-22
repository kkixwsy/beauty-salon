const db = require("../models");
const Appointment = db.appointment;

exports.create = (req, res) => {
  if (!req.body.dateTime || !req.body.clientId) {
    return res.status(400).send({ message: "dateTime and clientId cannot be empty!" });
  }
  const data = {
    dateTime: req.body.dateTime,
    status: req.body.status || "pending",
    totalPrice: req.body.totalPrice,
    comment: req.body.comment,
    clientId: req.body.clientId,
    masterId: req.body.masterId
  };
  Appointment.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message || "Error creating appointment" }));
};

exports.findAll = (req, res) => {
  Appointment.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving appointments" }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Appointment.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Appointment with id=${id} not found` });
    })
    .catch(err => res.status(500).send({ message: "Error retrieving appointment with id=" + id }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Appointment.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Appointment updated successfully" });
      else res.send({ message: `Cannot update appointment with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error updating appointment with id=" + id }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Appointment.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Appointment deleted successfully" });
      else res.send({ message: `Cannot delete appointment with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error deleting appointment with id=" + id }));
};

exports.deleteAll = (req, res) => {
  Appointment.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Appointments were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all appointments." }));
};
// Записи на сегодня
exports.getTodayAppointments = async (req, res) => {
  try {
    const query = `
      SELECT a.id, a."dateTime", a.status, 
             c.name as client_name, m.name as master_name
      FROM appointments a
      JOIN clients c ON a."clientId" = c.id
      JOIN masters m ON a."masterId" = m.id
      WHERE DATE(a."dateTime") = CURRENT_DATE
      ORDER BY a."dateTime" ASC
    `;
    const result = await db.sequelize.query(query, { 
      type: db.Sequelize.QueryTypes.SELECT 
    });
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// Количество записей на сегодня
exports.getTodayCount = async (req, res) => {
  try {
    const query = `SELECT COUNT(*) as count FROM appointments WHERE DATE("dateTime") = CURRENT_DATE`;
    const result = await db.sequelize.query(query, { 
      type: db.Sequelize.QueryTypes.SELECT 
    });
    res.send(result[0]);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};