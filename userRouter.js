const {Router} = require('express');
const router = Router();
const controller = require('../controllers/userController');

router.get('/',controller.getIndex);
router.post('/',controller.createUser);


  

router.get('/profile',controller.getProfile);
router.post('/profile', controller.checkUser);

router.get('/protected-route',controller.checkUserSession,controller.protectedRoute);

module.exports = router;