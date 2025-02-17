const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Serve gambar yang di-upload

const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");
const historyRoutes = require("./routes/history");

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/history", historyRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
