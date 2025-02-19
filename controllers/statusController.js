const db = require('../config/db');

exports.getStatus = (req, res) => {
  db.query(
"SELECT COALESCE(MAX(CASE WHEN status = 'dipakai' THEN count END), 0) AS dipakai, COALESCE(MAX(CASE WHEN status = 'dikembalikan' THEN count END), 0) AS dikembalikan, COALESCE(MAX(CASE WHEN status = 'rusak' THEN count END), 0) AS rusak, COALESCE(MAX(CASE WHEN status = 'tersedia' THEN count END), 0) AS tersedia FROM ( SELECT status, COUNT(*) AS count FROM items GROUP BY status ) subquery;",
   (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    }
  );
};
