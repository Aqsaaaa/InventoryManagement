const db = require('../config/db');

const getLowStockItems = (req, res) => {
    db.query('SELECT jumlah, nama, kategori FROM items WHERE jumlah < 10', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(200).json({ message: 'No low stock items found' });
        res.status(200).json({ message: 'Low stock items found', data: results });
    });
};

module.exports = {
    getLowStockItems
};   