let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../index.js')
let mongoose = require('mongoose')
require('dotenv').config()

chai.use(chaiHttp)
chai.should()

describe("Tests for application.", () => {
    before((done) => {
        mongoose.connect('mongodb://localhost:27017');
        db = mongoose.connection;
        db.on("error", console.error.bind(console, "Unable to connect to MongoDB"));
        db.once("open", function () {
          console.log("Connected to MongoDB");
          done();
        })
    })
    describe("Test case for indexing all messages.", () => {
        it("Should retrieve all messages in the database.", async() => {
            chai.request(app)
                .get('/api/message')
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                })
        })
    })
})
