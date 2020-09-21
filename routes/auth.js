/*
    Path '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {login} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post('/',
    [
        check('email', 'el Email es obligatorio').isEmail(),
        check('password', 'el password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);


module.exports = router;
