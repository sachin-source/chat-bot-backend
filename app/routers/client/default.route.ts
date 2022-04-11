import  clientDefaultController from '../../controllers/client/default.controller';

var express = require('express');
var router = express.Router();

const ClientDefaultController = new clientDefaultController()

// /api/default/
router.route('/')
    .get(ClientDefaultController.index)

module.exports = router;