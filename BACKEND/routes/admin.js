const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');
const authMiddleware = require('../middlewares/auth')

router.post('/',authMiddleware,  adminCtrl.create);
router.delete('/:id',authMiddleware, adminCtrl.delete);
router.get('/check/:id',authMiddleware, adminCtrl.isAdmin);

module.exports = router;