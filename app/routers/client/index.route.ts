const clientDefaultRoutes = require('./default.route')
const widgetAuthRoutes = require('./widget.auth.route')
const messageRoutes = require('./message.route')

var express = require('express');
var router = express.Router();

// /api/default
router.use('/default', clientDefaultRoutes);

// /api/widget/auth
router.use('/widget/auth', widgetAuthRoutes);
router.use('/message', messageRoutes);

// /api/*
// router.use('*', clientDefaultRoutes);

module.exports = router;