const db = require("../models");
const Client = db.client;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.phone) {
    return res.status(400).send({ message: "Name and phone cannot be empty!" });
  }
  const data = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    birthDate: req.body.birthDate,
    loyaltyPoints: req.body.loyaltyPoints || 0,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true
  };
  Client.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message || "Error creating client" }));
};

exports.findAll = (req, res) => {
  Client.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving clients" }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Client.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Client with id=${id} not found` });
    })
    .catch(err => res.status(500).send({ message: "Error retrieving client with id=" + id }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Client.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Client updated successfully" });
      else res.send({ message: `Cannot update client with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error updating client with id=" + id }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Client.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Client deleted successfully" });
      else res.send({ message: `Cannot delete client with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error deleting client with id=" + id }));
};

exports.deleteAll = (req, res) => {
  Client.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Clients were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all clients." }));
};
