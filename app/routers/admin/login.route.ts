import  adminLoginController from '../../controllers/admin/login.controller';

var express = require('express');
var router = express.Router();

const AdminLoginController = new adminLoginController()

// /admin-api/login/
router.route('/')
    .get(AdminLoginController.login);
    // .get(AdminLoginController.index);

// /admin-api/login/login
// router.route('/login')
//     .get(AdminLoginController.login);
module.exports = router;