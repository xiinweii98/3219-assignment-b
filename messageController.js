const e = require("express");
Msg = require("./messageModel");
jwt = require("jsonwebtoken");
require("dotenv").config();

async function verifyToken(name, token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.id != name) {
      return null;
    }
    console.log(decoded);
    return decoded;
  } catch (err) {
    console.log(`ERROR: Unable to verify JWT for ${name}`);
    return { err };
  }
}

function verifyRole(role) {
  const authorizedRoles = ["admin"];
  return authorizedRoles.includes(role);
}

exports.index = async (req, res) => {
  const name = req.body.name;
  const jwt = req.body.jwt;
  const verification = await verifyToken(name, jwt);
  if (!verification || verification.err) {
    res.status(401).json({
      message: "Unable to authenticate.",
    });
  } else {
    if (!verifyRole(verification.role)) {
      res.status(403).json({
        message: "Unable to authorize.",
      });
    } else {
      Msg.get((err, msgs) => {
        if (err) {
          res.status(400).json({
            message: err,
          });
        } else {
          res.status(200).json({
            message: "Messages retrieved successfully",
            data: msgs,
          });
        }
      });
    }
  }
};

exports.new = (req, res) => {
  let msg = new Msg();
  msg.name = req.body.name;
  msg.content = req.body.content;

  msg.save((err) => {
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(201).json({
        message: "New message created!",
        data: msg,
      });
    }
  });
};

exports.view = (req, res) => {
  Msg.findById(req.params.message_id, (err, msg) => {
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(201).json({
        message: "Message details loading...",
        data: msg,
      });
    }
  });
};

exports.update = (req, res) => {
  Msg.findById(req.params.message_id, (err, msg) => {
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      msg.name = req.body.name ? req.body.name : msg.name;
      msg.content = req.body.content ? req.body.content : msg.content;
      msg.save((err) => {
        if (err) {
          res.status(400).json({
            message: err,
          });
        } else {
          res.status(201).json({
            message: "Message info updated.",
            data: msg,
          });
        }
      });
    }
  });
};

exports.delete = (req, res) => {
  Msg.deleteOne(
    {
      _id: req.params.message_id,
    },
    (err, msg) => {
      if (err) {
        res.status(400).json({
          message: err,
        });
      } else {
        res.status(201).json({
          message: "Message deleted.",
        });
      }
    }
  );
};
