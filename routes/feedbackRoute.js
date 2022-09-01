const router = require('express').Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/', feedbackController.createFeedback);
router.put('/:id', feedbackController.updateFeedback);
router.delete('/:id', feedbackController.deleteFeedback);
router.get('/', feedbackController.getAllFeedbacks);
router.get('/:id', feedbackController.feedbackInfo);

module.exports = router;