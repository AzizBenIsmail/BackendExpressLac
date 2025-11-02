var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const uploadfile = require('../middlewares/uploadfile');
const { requireAuthUser } = require('../middlewares/authMiddlewares');
//router.use(requireAuthUser);
/* GET users listing. */
router.post('/login', userController.login);
router.post('/createClient', userController.createClient);
router.post('/createClientWithImg',requireAuthUser,uploadfile.single("image_User"), userController.createClientWithImg);
router.post('/createAdmin', userController.createAdmin);
router.get('/getAllUsers',requireAuthUser, userController.getAllUsers);
router.get('/getClient', userController.getClient);
router.get('/getAdmin', userController.getAdmin);
router.get('/getUser18', userController.getUser18);
router.get('/getUserById/:id', userController.getUserById);
router.get('/getUseAuth', requireAuthUser,userController.getUseAuth);
router.get('/getUserIntervalAge', userController.getUserIntervalAge);
router.get('/getMoyAgeClient', userController.getMoyAgeClient);
router.get('/getUserNameE', userController.getUserNameE);
router.get('/search', userController.search);
router.put('/updateByID/:id', userController.updateByID);
router.delete('/deleteUserById/:id', userController.deleteUserById);

module.exports = router;
