const db = require("../models");

// Общая выручка
exports.getTotalRevenue = async (req, res) => {
  try {
    const query = `SELECT COALESCE(SUM("totalAmount"), 0) as total FROM purchases WHERE status = 'completed'`;
    const result = await db.sequelize.query(query, { 
      type: db.Sequelize.QueryTypes.SELECT 
    });
    res.send(result[0]);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};