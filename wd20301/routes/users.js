const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/', userController.getAll);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;