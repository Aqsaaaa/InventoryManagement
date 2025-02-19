const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const historyRoutes = require('./routes/history');
const statusRoutes = require('./routes/status');

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/status', statusRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
