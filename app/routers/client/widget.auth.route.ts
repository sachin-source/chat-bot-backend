import  widgetAuthController from '../../controllers/client/widget.auth.controller';

var express = require('express');
var router = express.Router();

const WidgetAuthController = new widgetAuthController()

// /api/default/
router.route('/')
    .get(WidgetAuthController.generateToken)

module.exports = router;