const adminDefaultRoutes = require('./default.route')
const loginDefaultRoutes = require('./login.route')
const adminChannelRoutes = require('./channel.route')
const adminUserIdRoutes = require('./userId.route')
const adminSupportRoutes = require('./support.route')

var express = require('express');
var router = express.Router();

// /admin-api/
router.use('/default', adminDefaultRoutes);
router.use('/login', loginDefaultRoutes);
router.use('/channel', adminChannelRoutes);
router.use('/userId', adminUserIdRoutes);
router.use('/support', adminSupportRoutes);

router.use('/*', adminDefaultRoutes);

module.exports = router;


/**
 * Things completed :
 * 
 * login and token generation.
 * channel creation.
 * listing the userids based on channel id.
 * admin logging in as support.
 * receiving messages from the queue and storing them.
 * publishing the stored messages to another queue ( saved messages queue ) to send other edge for response.
 */

/**
 * Things to complete :
 * 
 * listing the messages based on userId.
 * listing the channels based on privateKey.
 * resolve - reopen functionality.
 * message format handling.
 * admin broadcasting.
 * endpoint for messages.
 * webhook intigration.
 */