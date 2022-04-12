import  adminUserIdController from '../../controllers/admin/userId.controller';

var express = require('express');
var router = express.Router();

const AdminUserIdController = new adminUserIdController()

// /admin-api/userId/
router.route('/')
    .get(AdminUserIdController.getUserIds)

module.exports = router;