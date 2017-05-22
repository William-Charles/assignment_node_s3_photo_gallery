const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

let models = {};

models.User = require("./User");
models.User = require("./Photos");

module.exports = models;
