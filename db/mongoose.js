const mongoose = require('mongoose');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

// User and Password haven't been set up in Vagrant, otherwise the MONGO_URL would be as follow:
// const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
const MONGO_URL = `mongodb://localhost/${MONGO_DB}`;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
