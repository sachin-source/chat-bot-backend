import  adminAuthController from '../../controllers/admin/auth.controller';

var express = require('express');
var router = express.Router();

const AdminAuthController = new adminAuthController()

// /admin-api/channel/
router.route('/')
    .get(AdminAuthController.auth)


module.exports = router;
