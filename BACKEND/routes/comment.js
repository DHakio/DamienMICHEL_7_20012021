const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const authMiddleware = require('../middlewares/auth')

router.get('/', authMiddleware, commentCtrl.getAll);
router.post('/', authMiddleware, commentCtrl.create);
router.get('/:id', authMiddleware, commentCtrl.getOne);
router.put('/:id', authMiddleware, commentCtrl.update);
router.delete('/:id', authMiddleware, commentCtrl.delete);

module.exports = router;