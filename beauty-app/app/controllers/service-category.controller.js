const db = require("../models");
const ServiceCategory = db.serviceCategory;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.code) {
    return res.status(400).send({ message: "Name and code cannot be empty!" });
  }
  const data = {
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    sortOrder: req.body.sortOrder || 0,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true
  };
  ServiceCategory.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message || "Error creating category" }));
};

exports.findAll = (req, res) => {
  ServiceCategory.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving categories" }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  ServiceCategory.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Category with id=${id} not found` });
    })
    .catch(err => res.status(500).send({ message: "Error retrieving category with id=" + id }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  ServiceCategory.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Category updated successfully" });
      else res.send({ message: `Cannot update category with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error updating category with id=" + id }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  ServiceCategory.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Category deleted successfully" });
      else res.send({ message: `Cannot delete category with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error deleting category with id=" + id }));
};

exports.deleteAll = (req, res) => {
  ServiceCategory.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Categories were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all categories." }));
};
