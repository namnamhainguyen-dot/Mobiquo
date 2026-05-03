const express = require('express');
const router = express.Router();
// Đảm bảo đường dẫn này khớp với tên file trong thư mục controllers
const bonusController = require('../controllers/bonuses'); 

router.get('/', bonusController.getAll);
router.get('/:id', bonusController.getById);
router.post('/', bonusController.create);
router.put('/:id', bonusController.update);
router.delete('/:id', bonusController.delete);

module.exports = router;