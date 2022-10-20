const e = require('express')

Msg = require('./messageModel')

exports.index = (req, res) =>
    Msg.get((err, msgs) => {
        if (err) {
            res.status(400).json({
                message: err
            })
        } else {
            res.status(201).json({
                message: "Messages retrieved successfully",
                data: msgs
            })
        }
    })

exports.new = (req, res) => {
    let msg = new Msg()
    msg.name = req.body.name
    msg.content = req.body.content

    msg.save(err => {
        if (err) {
            res.status(400).json({
                message: err
            })
        } else {
            res.status(201).json({
                message: 'New message created!',
                data: msg
            })
        }
    })
}

exports.view = (req, res) => {
    Msg.findById(req.params.message_id, (err, msg) => {
        if (err) {
            res.status(400).json({
                message: err
            })
        } else {
            res.status(201).json({
                message: 'Message details loading...',
                data: msg
            })
        }
    })
}

exports.update = (req, res) => {
    Msg.findById(req.params.message_id, (err, msg) => {
        if (err) {
            res.status(400).json({
                message: err
            })
        } else {
            msg.name = req.body.name ? req.body.name : msg.name
            msg.content = req.body.content ? req.body.content : msg.content
            msg.save(err => {
                if (err) {
                    res.status(400).json({
                        message: err
                    })
                } else {
                    res.status(201).json({
                        message: 'Message info updated.',
                        data: msg
                    })
                }
            })
        }
    })
}

exports.delete = (req, res) => {
    Msg.deleteOne({
        _id: req.params.message_id
    }, (err, msg) => {
        if (err) {
            res.status(400).json({
                message: err
            })
        } else {
            res.status(201).json({
                message: 'Message deleted.'
            })
        }
    })
}