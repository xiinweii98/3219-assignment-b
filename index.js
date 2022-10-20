let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let app = express()
let messageController = require('./messageController')

let router = require('express').Router()
app.use(bodyParser.urlencoded({
   extended: true
}))
app.use(bodyParser.json())

require('dotenv').config()
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true});
let db = mongoose.connection;
if (!db) {
   console.log("Error connecting to mongodb.")
} else {
   console.log("Mongodb connected successfully.")
}

let port = process.env.PORT || 8080
app.get('/', (req, res) => res.send('Default URL reached.'))

// Set default API response
router.get('/', (_, res) => 
    res.json({
        status: 'API is working.',
        message: 'Reached default API route.'
    }))

router.get('/message', messageController.index)
router.post('/message', messageController.new)
router.get('/message/:message_id', messageController.view)
router.put('/message/:message_id', messageController.update)
router.delete('/message/:message_id', messageController.delete)

app.use('/api', router)

app.listen(port, function () {
     console.log("Running CS3219 Assignment B on port " + port)
});

module.exports = app