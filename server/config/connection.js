const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/symphony',
  {
    useNewUrlParser: true,
  }
);

module.exports = mongoose.connection;