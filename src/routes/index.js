const router = require('express').Router();
const questionRoute = require('./question');
const post = require('./post');

router.use('/questions', questionRoute);
router.use('/post', post);
router.use('/teas', require('./teas'));

module.exports = router;