const db = require("../models");
const Service = db.services;

// Создать новую услугу
exports.create = (req, res) => {
  // Валидация
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name cannot be empty!"
    });
  }

  const service = {
    name: req.body.name,
    price: req.body.price,
    duration: req.body.duration,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true
  };

  Service.create(service)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the service."
      });
    });
};

// Получить все услуги
exports.findAll = (req, res) => {
  Service.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving services."
      });
    });
};

// Получить одну услугу по id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Service.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Service with id=${id} not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving service with id=" + id
      });
    });
};

// Обновить услугу
exports.update = (req, res) => {
  const id = req.params.id;

  Service.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Service was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update service with id=${id}. Maybe service was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating service with id=" + id
      });
    });
};

// Удалить услугу
exports.delete = (req, res) => {
  const id = req.params.id;

  Service.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Service was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete service with id=${id}. Maybe service was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete service with id=" + id
      });
    });
};

// Удалить все услуги
exports.deleteAll = (req, res) => {
  Service.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} services were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all services."
      });
    });
};

// Получить все активные услуги
exports.findAllActive = (req, res) => {
  Service.findAll({ where: { isActive: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving services."
      });
    });
};