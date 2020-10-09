/*
    Entidades
    '/api/entidades'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{
    getEntidades,
    crearEntidades,
    actualizarEntidades,
    borrarEntidades
} = require('../controllers/entidad')

const router = Router();

//get
router.get('/' , validarJWT, getEntidades);

//Post
router.post('/',
    [   validarJWT,
        check('nombre','el nombre de la entidad es necesario').not().isEmpty(),
        validarCampos,
    ],

    crearEntidades
);

router.put('/:id', validarJWT,
    [],
    actualizarEntidades
);

router.delete('/:id' , validarJWT ,borrarEntidades);


module.exports = router; 