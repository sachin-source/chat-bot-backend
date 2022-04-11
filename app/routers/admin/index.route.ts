const adminDefaultRoutes = require('./default.route')
const loginDefaultRoutes = require('./login.route')
const adminChannelRoutes = require('./channel.route')

var express = require('express');
var router = express.Router();

// /admin-api/
router.use('/default', adminDefaultRoutes);
router.use('/login', loginDefaultRoutes);
router.use('/channel', adminChannelRoutes);


module.exports = router;