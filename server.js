const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const historyRoutes = require('./routes/history');

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
