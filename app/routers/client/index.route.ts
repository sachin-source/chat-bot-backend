const clientDefaultRoutes = require('./default.route')
const widgetAuthRoutes = require('./widget.auth.route')

var express = require('express');
var router = express.Router();

// /api/default
router.use('/default', clientDefaultRoutes);

// /api/widget/auth
router.use('/widget/auth', widgetAuthRoutes);

// /api/*
// router.use('*', clientDefaultRoutes);

module.exports = router;