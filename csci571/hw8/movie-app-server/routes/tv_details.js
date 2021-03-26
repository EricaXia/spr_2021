var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('TV details here');
});

module.exports = router;
