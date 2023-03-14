const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration');

router.get('', registrationController.mainControl);
router.post('', registrationController.validation);

module.exports = router;