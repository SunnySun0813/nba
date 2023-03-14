const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.get('/:title', productController.mainControl);

module.exports = router;