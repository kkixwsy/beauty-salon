const db = require("../models");
const Service = db.service;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).send({ message: "Name and price cannot be empty!" });
  }
  const data = {
    name: req.body.name,
    price: req.body.price,
    duration: req.body.duration,
    description: req.body.description,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    serviceCategoryId: req.body.serviceCategoryId
  };
  Service.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message || "Error creating service" }));
};

exports.findAll = (req, res) => {
  Service.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving services" }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Service.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Service with id=${id} not found` });
    })
    .catch(err => res.status(500).send({ message: "Error retrieving service with id=" + id }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Service.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Service updated successfully" });
      else res.send({ message: `Cannot update service with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error updating service with id=" + id }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Service.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Service deleted successfully" });
      else res.send({ message: `Cannot delete service with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error deleting service with id=" + id }));
};

exports.deleteAll = (req, res) => {
  Service.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Services were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all services." }));
};
