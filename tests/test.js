let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index.js");
let mongoose = require("mongoose");
require("dotenv").config();
let Message = require("../messageModel");

chai.use(chaiHttp);
chai.should();

describe("Tests for application.", () => {
  before((done) => {
    mongoose.connect("mongodb://localhost:27017");
    db = mongoose.connection;
    db.on("error", console.error.bind(console, "Unable to connect to MongoDB"));
    db.once("open", function () {
      console.log("Connected to MongoDB");
      done();
    });
  });
  describe("Test case for indexing all messages. (GET)", () => {
    it("Should retrieve all messages in the database.", async () => {
      chai
        .request(app)
        .get("/api/message")
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
        });
    });
  });
  describe("Test case for adding a message. (POST)", () => {
    it("Should add message in the database.", async () => {
      const message = {
        name: "xinwei",
        content: "xinwei1",
      };
      chai
        .request(app)
        .post("/api/message")
        .send(message)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.data.should.have.property("name");
          res.body.data.should.have.property("content");
        });
    });
  });
  describe("Test case for updating a message. (PUT)", () => {
    it("Should update message in the database.", async () => {
      const message = new Message({
        name: "xinwei",
        content: "xinwei",
      });
      const newMessage = {
        name: "xinwei",
        content: "i am xinwei",
      };
      message.save((err, msg) => {
        chai
          .request(app)
          .put("/api/message" + msg.id)
          .send(newMessage)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.data.should.have.property("name");
            res.body.data.should.have.property("content").eql("i am xinwei");
          });
      });
    });
  });
  describe("Test case for deleting a message. (DELETE)", () => {
    it("Should delete message in the database.", async () => {
      const message = new Message({
        name: "xinwei",
        content: "xinwei",
      });
      message.save((err, msg) => {
        chai
          .request(app)
          .delete("/api/message" + msg.id)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property("message");
          });
      });
    });
  });
});
