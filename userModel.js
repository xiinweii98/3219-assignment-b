let mongoose = require("mongoose");

let UserModelSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
});

let User = (module.exports = mongoose.model("user", UserModelSchema));

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};
