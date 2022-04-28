import  clientMessageController from '../../controllers/client/message.controller';

var express = require('express');
var router = express.Router();

const ClientMessageController = new clientMessageController()

// /api/message/
router.route('/')
    .get(ClientMessageController.getAllMessages)

module.exports = router;