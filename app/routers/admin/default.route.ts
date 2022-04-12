import  adminDefaultController from '../../controllers/admin/default.controller';

var express = require('express');
var router = express.Router();

const AdminDefaultController = new adminDefaultController()

// /admin-api/default/
router.route('/')
    .get(AdminDefaultController.index)

module.exports = router;