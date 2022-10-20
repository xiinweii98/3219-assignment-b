let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../index.js')

chai.use(chaiHttp)
chai.should()

describe("Tests for application.", () => {
    before(() => {
        // different db?
        // clean up db?
    })
    describe("Test case for indexing all messages.", () => {
        it("Should retrieve all messages in the database.", (done) => {
            chai.request(app)
                .get('/api/message')
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    done()
                })
        })
    })
})