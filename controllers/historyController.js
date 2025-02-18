const db = require('../config/db');

exports.addHistory = (req, res) => {
  const { id_barang, status, deskripsi_pemakaian } = req.body;

  db.query(
    'INSERT INTO history (id_barang, status, deskripsi_pemakaian) VALUES (?, ?, ?)', 
    [id_barang, status, deskripsi_pemakaian],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'History added successfully' });
    }
  );
};

exports.getHistory = (req, res) => {
  db.query('SELECT * FROM history', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getHistoryByItemId = (req, res) => {
  const id_barang = req.params.id;
  db.query('SELECT * FROM history WHERE id_barang = ?', [id_barang], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
