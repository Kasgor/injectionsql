const express = require('express');
const router = express.Router();
const controller = require('./controllerLogin');
const controllerR = require('./controllerRegistration');

router.get('/setup', controller.setupDatabase);

router.post('/register', controllerR.registerUser);
router.post('/secure-register', controllerR.registerUserSecurely);
router.post('/register-call', controllerR.registerUserCallProcedure);
router.post('/register', controllerR.registerValidate);

router.post('/login', controller.loginUser);
router.post('/secure-login', controller.loginUserSecurely);
router.post('/validate-login', controller.loginValidate);
router.post('/call-login', controller.loginUserCallProcedure);


module.exports = router;