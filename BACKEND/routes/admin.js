const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');

router.post('/', adminCtrl.create);
router.delete('/:id', adminCtrl.delete);
router.get('/check/:id', adminCtrl.isAdmin);

module.exports = router;