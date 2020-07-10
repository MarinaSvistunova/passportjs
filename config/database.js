const mongoose = require('mongoose');

require('dotenv').config();

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// simple schema for useNewUrlParser
// hash and salt from user's password
const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String
});

const User = connection.model('User', UserSchema);

module.exports = connection;
