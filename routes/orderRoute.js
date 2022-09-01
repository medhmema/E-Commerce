const router = require('express').Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.get('/' , orderController.getAllOrders);
router.get('/:id', orderController.orderInfo);

module.exports = router;