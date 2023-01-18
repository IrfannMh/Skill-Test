const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userDetailController = require('../controllers/userDetailController');
const productController = require('../controllers/productController');

const authenticate = require('../middlewares/authenticate');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({storage})

///Endpoint Create Auth
router.post('/api/login', userController.handleLogin)
router.post('/api/register', userController.handleRegister)
router.post('/api/forgotpassword', userController.handleForgotPassword)


//Endpoint Create User Management
router.post('/api/user', authenticate, upload.single('image'),userDetailController.handleCreateDetail)
router.get('/api/user', authenticate, userDetailController.handleGetDetail)
router.post('/api/user/:id',authenticate, upload.single('image'),userDetailController.handleUpdateDetail )
router.delete('/api/user/:id',authenticate,userDetailController.handleDeleteDetail )


//Endpoint Create Product Management
router.post('/api/product',authenticate, upload.single('image'),productController.handleCreateProduct)
router.get('/api/product',authenticate,productController.handleGetProduct)
router.post('/api/product/:id',authenticate, upload.single('image'),productController.handleUpdateProduct)
router.delete('/api/product/:id',authenticate,productController.handleDeleteProduct)


module.exports = router;
