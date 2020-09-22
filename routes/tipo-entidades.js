/*
     Tipo Entidad
    '/api/tipo-entidades'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{
    getTipoEntindad,
    crearTipoEntindad,
    actualizarTipoEntindad,
    borrarTipoEntindad
} = require('../controllers/tipo-entidades')

const router = Router();

//get
router.get('/' ,getTipoEntindad);

//Post
router.post('/',
    [
        check('nombre','el nombre del tipo de la entidad es necesario').not().isEmpty(),
        validarCampos
    ],
    crearTipoEntindad
);

router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarTipoEntindad
);

router.delete('/:id' ,borrarTipoEntindad);


module.exports = router; 