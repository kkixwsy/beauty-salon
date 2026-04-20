const db = require("../models");
const Goods = db.goods;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.basePrice) {
    return res.status(400).send({ message: "Name and basePrice cannot be empty!" });
  }
  const data = {
    name: req.body.name,
    basePrice: req.body.basePrice,
    duration: req.body.duration,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true
  };
  Goods.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message || "Error creating goods" }));
};

exports.findAll = (req, res) => {
  Goods.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving goods" }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Goods.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Goods with id=${id} not found` });
    })
    .catch(err => res.status(500).send({ message: "Error retrieving goods with id=" + id }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Goods.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Goods updated successfully" });
      else res.send({ message: `Cannot update goods with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error updating goods with id=" + id }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Goods.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Goods deleted successfully" });
      else res.send({ message: `Cannot delete goods with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error deleting goods with id=" + id }));
};

exports.deleteAll = (req, res) => {
  Goods.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Goods were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all goods." }));
};

// НЕСТАНДАРТНЫЕ ЗАПРОСЫ
exports.getGoodsGroupName = async (req, res) => {
  const id = req.params.id;
  try {
    const goods = await Goods.findByPk(id);
    if (!goods) {
      return res.status(404).send({ message: `Goods with id=${id} not found` });
    }
    
    if (goods.serviceCategoryId) {
      const category = await db.serviceCategory.findByPk(goods.serviceCategoryId);
      if (category) {
        return res.send({ category_name: category.name });
      }
    }
    
    res.status(404).send({ message: `Category not found for goods id=${id}` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// Получить всю категорию товара по ID товара
exports.getGoodsGroup = async (req, res) => {
  const id = req.params.id;
  try {
    // Сначала найдём товар, чтобы получить serviceCategoryId
    const goods = await Goods.findByPk(id);
    if (!goods) {
      return res.status(404).send({ message: `Goods with id=${id} not found` });
    }
    
    // Если есть serviceCategoryId, найдём категорию
    if (goods.serviceCategoryId) {
      const category = await db.serviceCategory.findByPk(goods.serviceCategoryId);
      if (category) {
        return res.send(category);
      }
    }
    
    res.status(404).send({ message: `Category not found for goods id=${id}` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};