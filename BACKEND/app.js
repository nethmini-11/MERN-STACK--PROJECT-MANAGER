require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");
var bodyParser = require('body-parser');
var multer =  require('multer');
var path = require('path');
const connectDB = require("./config/db");

const auth = require("./middlewares/auth");

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(require("cors")());

// routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/registertopic"));
app.use("/api", require("./routes/addgroup"));


















// server configurations.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`server listening on port: ${PORT}`);
});
