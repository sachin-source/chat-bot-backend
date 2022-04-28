import  adminMessageController from '../../controllers/admin/message.controller';
import { authenticateSupport } from '../../services/admin/common.service';

var express = require('express');
var router = express.Router();

const AdminMessageController = new adminMessageController()

// /admin-api/message/
router.route('/')
    .get(authenticateSupport, AdminMessageController.getAllMessages)

module.exports = router;