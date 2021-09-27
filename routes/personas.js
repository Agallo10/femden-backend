/*
    Personas
    '/api/personas'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{
    getPersonas,
    getPersona,
    crearPersonas,
    actualizarPersonas,
    borrarPersonas
} = require('../controllers/personas')

const router = Router();

//get
router.get('/' ,validarJWT, getPersonas);

router.get('/:id' ,validarJWT, getPersona);

//Post
router.post('/',
    [
        check('nombre','el nombre de la persona es necesario').not().isEmpty(),
        check('telefono','el telefono de la persona es necesario').not().isEmpty(),
        check('documento','el documento de la persona es necesario').not().isEmpty(),
        check('email','el email de la persona es necesario').not().isEmpty(),
        check('direccion','la direccion de la persona es necesaria').not().isEmpty(),
        validarCampos
    ],

    crearPersonas
);

router.put('/:id',
    [],
    actualizarPersonas
);

router.delete('/:id' ,borrarPersonas);


module.exports = router; 