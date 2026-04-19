const db = require("../models");
const Purchase = db.purchase;

exports.create = (req, res) => {
  if (!req.body.totalAmount) {
    return res.status(400).send({ message: "totalAmount cannot be empty!" });
  }
  const data = {
    purchaseDate: req.body.purchaseDate || new Date(),
    totalAmount: req.body.totalAmount,
    status: req.body.status || "completed"
  };
  Purchase.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message || "Error creating purchase" }));
};

exports.findAll = (req, res) => {
  Purchase.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving purchases" }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Purchase.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Purchase with id=${id} not found` });
    })
    .catch(err => res.status(500).send({ message: "Error retrieving purchase with id=" + id }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Purchase.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Purchase updated successfully" });
      else res.send({ message: `Cannot update purchase with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error updating purchase with id=" + id }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Purchase.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Purchase deleted successfully" });
      else res.send({ message: `Cannot delete purchase with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error deleting purchase with id=" + id }));
};

exports.deleteAll = (req, res) => {
  Purchase.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Purchases were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all purchases." }));
};
