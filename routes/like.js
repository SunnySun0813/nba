const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like');

router.get('/addLike/:title', likeController.addLike);
router.get('/removeLike/:title', likeController.removeLike);
router.get('', likeController.mainController);

module.exports = router;