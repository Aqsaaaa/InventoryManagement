const db = require("../db");
const multer = require("multer");
const upload = multer();
exports.getHistory = (req, res) => {
  db.query("SELECT * FROM riwayat_pemakaian", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.addHistory = (req, res) => {
  upload.none()(req, res, async function () {
    const { id_barang, status, deskripsi_pemakaian } = req.body;

    if (!id_barang || !status) {
      return res
        .status(400)
        .json({ message: "ID barang dan status wajib diisi" });
    }

    db.query(
      "INSERT INTO riwayat_pemakaian (id_barang, status, deskripsi_pemakaian) VALUES (?, ?, ?)",
      [id_barang, status, deskripsi_pemakaian],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res
          .status(201)
          .json({
            id: results.insertId,
            id_barang,
            status,
            deskripsi_pemakaian,
          });
      }
    );
  });
};
