const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const multerConfig = require('../middlewares/multer-config');

router.get('/', authMiddleware, userCtrl.getAll);
router.get('/:id', authMiddleware, userCtrl.getOne);
router.put('/:userId', authMiddleware, multerConfig, userCtrl.update);
router.delete('/:userId', authMiddleware, userCtrl.delete);

module.exports = router;