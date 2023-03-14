const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/likeList/:email', adminController.showLikeList);
router.get('', adminController.mainControl);

module.exports = router;
