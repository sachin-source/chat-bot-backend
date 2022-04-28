import  adminChannelController from '../../controllers/admin/channel.controller';

var express = require('express');
var router = express.Router();

const AdminChannelController = new adminChannelController()

// /admin-api/channel/
router.route('/')
    .post(AdminChannelController.create)
    .put(AdminChannelController.updateChannel)
    .get(AdminChannelController.getChannels)

// /admin-api/channel/:id
router.route('/:channelId')
    .get(AdminChannelController.getChannel)

module.exports = router;

router.param('channelId', AdminChannelController.getByChannelId);