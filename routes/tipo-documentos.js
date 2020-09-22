/*
     Tipo Documento
    '/api/tipo-documentos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{
    getTipoDocumentos,
    crearTipoDocumentos,
    actualizarTipoDocumentos,
    borrarTipoDocumentos
} = require('../controllers/tipo-documentos')

const router = Router();

//get
router.get('/' ,getTipoDocumentos);

//Post
router.post('/',
    [
        check('nombre','el nombre del tipo de la denuncia es necesario').not().isEmpty(),
        validarCampos
    ],
    crearTipoDocumentos
);

router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarTipoDocumentos
);

router.delete('/:id' ,borrarTipoDocumentos);


module.exports = router; 