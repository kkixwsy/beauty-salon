const db = require("../models");
const Pricelist = db.pricelist;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.startDate) {
    return res.status(400).send({ message: "Name and startDate cannot be empty!" });
  }
  const data = {
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true
  };
  Pricelist.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message || "Error creating pricelist" }));
};

exports.findAll = (req, res) => {
  Pricelist.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving pricelists" }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Pricelist.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Pricelist with id=${id} not found` });
    })
    .catch(err => res.status(500).send({ message: "Error retrieving pricelist with id=" + id }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Pricelist.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Pricelist updated successfully" });
      else res.send({ message: `Cannot update pricelist with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error updating pricelist with id=" + id }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Pricelist.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Pricelist deleted successfully" });
      else res.send({ message: `Cannot delete pricelist with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error deleting pricelist with id=" + id }));
};

exports.deleteAll = (req, res) => {
  Pricelist.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Pricelists were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all pricelists." }));
};
