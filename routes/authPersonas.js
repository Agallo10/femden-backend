/*
    Path '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {loginPersonas, renewToken} = require('../controllers/authPersonas');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
    [
        check('email', 'el email es obligatorio').isEmail(),
        check('documento', 'el password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginPersonas
);

router.get('/renew',
    validarJWT,
    renewToken
);


module.exports = router;
