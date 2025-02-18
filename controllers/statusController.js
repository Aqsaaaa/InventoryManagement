const db = require('../config/db');

exports.getStatus = (req, res) => {
  db.query(
    'SELECT status, COUNT(*) AS count FROM items GROUP BY status',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    }
  );
};
