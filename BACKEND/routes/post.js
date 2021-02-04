const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const authMiddleware = require('../middlewares/auth')

router.get('/', authMiddleware, postCtrl.getAll);
router.post('/', authMiddleware, postCtrl.create);
router.get('/:id', authMiddleware, postCtrl.getOne);
router.put('/:id', authMiddleware, postCtrl.update);
router.delete('/:id', authMiddleware, postCtrl.delete);

module.exports = router;