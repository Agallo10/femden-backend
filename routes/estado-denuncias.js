/*
     Estado Denuncias
    '/api/estado-denuncias'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{
    getEstadoDenuncias,
    crearEstadoDenuncias,
    actualizarEstadoDenuncias,
    borrarEstadoDenuncias
} = require('../controllers/estado-denuncias')

const router = Router();

//get
router.get('/' ,getEstadoDenuncias);

//Post
router.post('/',
    [
        check('nombre','el nombre del estado de la denuncia es necesario').not().isEmpty(),
        validarCampos
    ],
    crearEstadoDenuncias
);

router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarEstadoDenuncias
);

router.delete('/:id' ,borrarEstadoDenuncias);


module.exports = router; 