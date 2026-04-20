const db = require("../models");
const Master = db.master;

exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: "Name cannot be empty!" });
  }
  const data = {
    name: req.body.name,
    phone: req.body.phone,
    specialization: req.body.specialization,
    experience: req.body.experience,
    rating: req.body.rating || 0,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true
  };
  Master.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message || "Error creating master" }));
};

exports.findAll = (req, res) => {
  Master.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving masters" }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Master.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Master with id=${id} not found` });
    })
    .catch(err => res.status(500).send({ message: "Error retrieving master with id=" + id }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Master.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Master updated successfully" });
      else res.send({ message: `Cannot update master with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error updating master with id=" + id }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Master.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Master deleted successfully" });
      else res.send({ message: `Cannot delete master with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error deleting master with id=" + id }));
};

exports.deleteAll = (req, res) => {
  Master.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Masters were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all masters." }));
};

// ========== НЕСТАНДАРТНЫЕ ЗАПРОСЫ ==========
exports.getMasterServices = async (req, res) => {
  const id = req.params.id;
  try {
    const master = await Master.findByPk(id);
    if (!master) {
      return res.status(404).send({ message: `Master with id=${id} not found` });
    }
    
    const query = `
      SELECT s.* 
      FROM services s
      JOIN master_services ms ON s.id = ms.service_id
      WHERE ms.master_id = ${id}
    `;
    
    const result = await db.sequelize.query(query, { 
      type: db.Sequelize.QueryTypes.SELECT 
    });
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Лучшие мастера с рейтингом выше 4.5
exports.getTopMasters = async (req, res) => {
  try {
    const query = `
      SELECT id, name, specialization, rating, experience
      FROM masters
      WHERE rating > 4.5 AND "isActive" = true
      ORDER BY rating DESC
    `;
    const result = await db.sequelize.query(query, { 
      type: db.Sequelize.QueryTypes.SELECT 
    });
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};