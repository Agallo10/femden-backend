/*
    Denuncias
    '/api/denuncias'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{
    getDenuncias,
    crearDenuncias,
    actualizarDenuncias,
    borrarDenuncias
} = require('../controllers/denuncias')

const router = Router();

//get
router.get('/' ,getDenuncias);

//Post
router.post('/',
    [
        check('texto','el texto de la denuncia es necesario').not().isEmpty(),
        check('persona','el id persona debe de ser valido').isMongoId(),
        validarCampos
    ],

    crearDenuncias
);

router.put('/:id',
    [],
    actualizarDenuncias
);

router.delete('/:id' ,borrarDenuncias);


module.exports = router; 