const router = require('express').Router();
const testRoute = require('./test');
const questionRoute = require('./question');

router.use('/test', testRoute);
router.use('/questions', questionRoute);

module.exports = router;