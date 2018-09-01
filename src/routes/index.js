const router = require('express').Router();
const questionRoute = require('./question');

router.use('/questions', questionRoute);
router.use('/teas', require('./teas'));

module.exports = router;