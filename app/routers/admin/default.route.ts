import  adminDefaultController from '../../controllers/admin/default.controller';

var express = require('express');
var router = express.Router();

const AdminDefaultController = new adminDefaultController()

// /api/default/
router.route('/')
    .get(AdminDefaultController.index)

module.exports = router;