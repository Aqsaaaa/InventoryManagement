const db = require("../db");

exports.getUsers = (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.addUser = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role || "user"], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, name, email, role });
    });
};
