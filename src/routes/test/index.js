const router = require('express').Router();
const homeRoute = require('./test');

router.route('/').get(homeRoute.home);

module.exports = router;