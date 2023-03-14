const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.get('/:page', homeController.mainControl);

module.exports = router;