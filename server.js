const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const historyRoutes = require('./routes/history');
const statusRoutes = require('./routes/status');
const notifRoutes = require('./routes/notification');

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/uploads', express.static('uploads'));
app.use('/api/notifications', notifRoutes);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
