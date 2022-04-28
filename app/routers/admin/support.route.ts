import adminSupportController from '../../controllers/admin/support.controller';

var express = require('express');
var router = express.Router();

const AdminSupportController = new adminSupportController()

// /admin-api/support/getAdminSupportToken
router.route('/getAdminSupportToken')
    .get(AdminSupportController.getAdminSupportToken)

module.exports = router;