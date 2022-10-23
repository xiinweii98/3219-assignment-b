jwt = require("jsonwebtoken");
require("dotenv").config();
User = require("./userModel");

async function signToken(name, role) {
  try {
    const token = jwt.sign({ id: name, role: role }, process.env.JWT_KEY, {
      expiresIn: 3600,
    });
    return token;
  } catch (err) {
    console.log(`ERROR: Unable to generate JWT for ${name}`);
    return { err };
  }
}

exports.login = async (req, res) => {
  const name = req.body.name;
  const user = await User.findOne({ username: name });
  const role = user.role;
  console.log(role);
  const jwt = await signToken(name, role);
  res.status(201).json({
    message: "Generated JWT successfully.",
    data: jwt,
  });
};

exports.create = async (req, res) => {
  let user = new User();
  user.username = req.body.name;
  user.role = req.body.role;

  user.save((err) => {
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(201).json({
        message: "New user created!",
        data: user,
      });
    }
  });
};
