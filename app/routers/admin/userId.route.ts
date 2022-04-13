import  adminUserIdController from '../../controllers/admin/userId.controller';
import { authenticateSupport } from '../../services/admin/common.service';

var express = require('express');
var router = express.Router();

const AdminUserIdController = new adminUserIdController()

// /admin-api/userId/
router.route('/')
    .get(authenticateSupport, AdminUserIdController.getUserIds)

module.exports = router;