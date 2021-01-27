const express = require('express');
const router = express.Router();
const topicCtrl = require('../controllers/topic');
const authMiddleware = require('../middlewares/auth');

router.get('/', topicCtrl.getAll);
router.post('/', topicCtrl.create);
router.get('/:id', topicCtrl.getOne);
router.put('/:id', topicCtrl.update);
router.delete('/:id', topicCtrl.delete);

module.exports = router;