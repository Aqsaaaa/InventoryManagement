const db = require("../db");

exports.getItems = (req, res) => {
  db.query("SELECT * FROM manajemen_barang", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const items = results.map(item => ({
      ...item,
      image: item.image ? `http://localhost:3000/uploads/${item.image}` : null
    }));

    res.status(200).json(items);
  });
};

exports.addItem = (req, res) => {
  const { nama, kategori, jumlah, deskripsi } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!nama || !kategori || !jumlah) {
    return res.status(400).json({ message: "Nama, kategori, dan jumlah wajib diisi" });
  }

  db.query("INSERT INTO manajemen_barang (nama, kategori, jumlah, deskripsi, image) VALUES (?, ?, ?, ?, ?)",
    [nama, kategori, jumlah, deskripsi, image], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, nama, kategori, jumlah, deskripsi, image });
    });
};
