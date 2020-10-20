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
    crearPersonas,
    actualizarPersonas,
    borrarPersonas
} = require('../controllers/personas')

const router = Router();

//get
router.get('/' ,validarJWT, getPersonas);

//Post
router.post('/',
    [
        check('nombre','el nombre de la persona es necesario').not().isEmpty(),
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