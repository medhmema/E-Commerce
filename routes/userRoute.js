const router = require('express').Router();
const userController = require('../controllers/userController');

router.put('/:id', userController.updateUserInfo);
router.put('/password/:id', userController.updateUserPassword);
router.delete('/:id', userController.deleteUser);
router.get('/' , userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.patch('/save-announcement/:id', userController.saveAnnouncement);
router.patch('/unsave-announcement/:id', userController.unsaveAnnouncement);
router.patch('/like-user/:id', userController.likeUser);
router.patch('/unlike-user/:id', userController.unlikeUser);
router.patch('/dislike-user/:id', userController.dislikeUser);
router.patch('/undislike-user/:id', userController.undislikeUser);

module.exports = router;