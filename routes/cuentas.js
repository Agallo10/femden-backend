const { Router } = require('express');
const { getCuentas, crearCuenta, actualizarCuenta, borrarCuenta } = require('../controllers/cuentas');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//get
router.get('/', validarJWT ,getCuentas);

//Post
router.post('/',
    [

        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],

    crearCuenta
);

router.put('/:id',
    [   
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarCuenta
);

router.delete('/:id',validarJWT ,borrarCuenta);


module.exports = router; 