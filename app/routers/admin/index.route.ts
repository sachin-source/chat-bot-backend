const adminDefaultRoutes = require('./default.route')
const loginDefaultRoutes = require('./login.route')
const adminChannelRoutes = require('./channel.route')
const adminUserIdRoutes = require('./userId.route')

var express = require('express');
var router = express.Router();

// /admin-api/
router.use('/default', adminDefaultRoutes);
router.use('/login', loginDefaultRoutes);
router.use('/channel', adminChannelRoutes);
router.use('/userId', adminUserIdRoutes);

router.use('/*', adminDefaultRoutes);

module.exports = router;