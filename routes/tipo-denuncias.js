/*
     Tipo Denuncias
    '/api/tipo-denuncias'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{
    getTipoDenuncias,
    crearTipoDenuncias,
    actualizarTipoDenuncias,
    borrarTipoDenuncias
} = require('../controllers/tipo-denuncias')

const router = Router();

//get
router.get('/' ,getTipoDenuncias);

//Post
router.post('/',
    [
        check('nombre','el nombre del tipo de la denuncia es necesario').not().isEmpty(),
        validarCampos
    ],
    crearTipoDenuncias
);

router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarTipoDenuncias
);

router.delete('/:id' ,borrarTipoDenuncias);


module.exports = router; 