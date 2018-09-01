const router = require('express').Router();
const testRoute = require('./test');

router.use('/test', testRoute);

module.exports = router;