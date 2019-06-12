const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product.controller');
const friend_controller = require('../controllers/friend.controller');
const user_controller = require('../controllers/user.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login/validate',friend_controller.validate);


router.get('/signup', function(req, res){
  res.render('sign_up', {title: 'User Login'})
})

router.post('/submit-form', function(req, res){
  const username = req.body.username;
  res.json({username});
})

// Product routes
router.get('/test', product_controller.test);
router.post('/create',  product_controller.product_create)
router.get('/search/:id', product_controller.product_details);
router.put('/:id/update', product_controller.product_update);
router.delete('/:id/delete', product_controller.product_delete);
router.get('/search',(req,res)=>{
  res.render('search');
})
router.post('/search',product_controller.product_search)


// Friend routes
router.get('/friend/test', friend_controller.test)
router.post('/friend/add', friend_controller.add_friend)
router.get('/friend/find', (req, res)=>{
  res.render('./friend/find');
});
router.post('/friend/find', friend_controller.find_friend)


// User routes
router.get('/user/', user_controller.signUpForm);
router.post('/user/add',user_controller.confirmPassword, user_controller.find_user,user_controller.createUser);


module.exports = router;