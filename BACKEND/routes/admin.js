const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');

router.post('/create/:id', adminCtrl.create);
router.post('/delete/:id', adminCtrl.delete);

module.exports = router;