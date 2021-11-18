const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
//const routes = require("./routes")
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/symphony' , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//app.use(routes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});