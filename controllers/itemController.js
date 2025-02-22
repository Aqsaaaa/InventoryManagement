const db = require('../config/db');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, + Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

exports.addItem = [upload.single('image'), (req, res) => {
  const { nama, kategori, jumlah, deskripsi, status } = req.body;
  const image = req.file ? req.file.filename : null; 
  db.query(
    'INSERT INTO items (nama, kategori, jumlah, deskripsi, status, image) VALUES (?, ?, ?, ?, ?, ?)', 
    [nama, kategori, jumlah, deskripsi, status, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Item added successfully' });
    }
  );
}];

exports.getItems = (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getItemById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM items WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(results[0]);
  });
};

exports.updateItem = (req, res) => {
  const id = req.params.id;
  const { nama, kategori, jumlah, deskripsi, status } = req.body;
  const image = req.file ? req.file.filename : null;

  db.query(
    'UPDATE items SET nama = ?, kategori = ?, jumlah = ?, deskripsi = ?, status = ?, image = ? WHERE id = ?',
    [nama, kategori, jumlah, deskripsi, status, image, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Item updated successfully' });
    }
  );
};

exports.deleteItem = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Item deleted successfully' });
  });
};
