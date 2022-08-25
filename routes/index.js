const express = require('express');
const controllers = require('../controller/controller');
const router = express.Router();

/* GET home page. */
router.get('/', controllers.myIndex);

module.exports = router;
