const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getAll);
router.get('/:id', userCtrl.getOne);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.delete);

module.exports = router;