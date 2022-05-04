const adminDefaultRoutes = require('./default.route')
const loginDefaultRoutes = require('./login.route')
const adminChannelRoutes = require('./channel.route')
const adminUserIdRoutes = require('./userId.route')
const adminSupportRoutes = require('./support.route')
const adminMessageRoutes = require('./message.route')

var express = require('express');
var router = express.Router();

// /admin-api/
router.use('/default', adminDefaultRoutes);
router.use('/login', loginDefaultRoutes);
router.use('/channel', adminChannelRoutes);
router.use('/userId', adminUserIdRoutes);
router.use('/support', adminSupportRoutes);
router.use('/message', adminMessageRoutes);

router.use('/*', adminDefaultRoutes);

module.exports = router;


/**
 * Things completed :
 * 
 * login and adminToken, supportToken generation.
 * channel creation.
 * listing the userids based on channel id.
 * admin logging in as support.
 * receiving messages from the queue and storing them.
 * publishing the stored messages to another queue ( saved messages queue ) to send other edge for response.
 * listing the messages based on userId.
 * listing the channels based on privateKey.
 */

/**
 * Things to complete :
 * 
 * resolve - reopen functionality for userids.
 * channel enable and disable options
 * message format handling.
 * admin broadcasting.
 * endpoint for messages.
 * webhook intigration.
 */

/**
 * @description frontend plan
 * 
 * 1. light and dark themes
 * 2. PWA
 * 3. colors as variables
 */