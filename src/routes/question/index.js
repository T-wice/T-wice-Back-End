const router = require('express').Router();
const controller = require('./controller');

router.route('/next').get(controller.question);

module.exports = router;