const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.get('/logout', loginController.logout);
router.get('', loginController.mainControl);
router.post('', loginController.validation);


module.exports = router;