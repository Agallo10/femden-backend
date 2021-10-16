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
    borrarDenuncias,
    getDenunciasPersonas,
    getDenunciasUid,
    getDenunciasTipo,
    actualizarDenuncias2,
    agregarNumeroRadicado
} = require('../controllers/denuncias')

const router = Router();

//get
router.get('/' ,validarJWT, getDenuncias);

router.get('/:id' ,validarJWT, getDenunciasPersonas);

router.get('/denuncia/:id' ,validarJWT, getDenunciasUid);

router.get('/denuncia-tipo/:id' ,validarJWT, getDenunciasTipo);
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
    [
        validarJWT,
        
    ],
    actualizarDenuncias
);

router.put('/finalizar/:id',
    [
        validarJWT,
    ],
    actualizarDenuncias2
);

router.put('/radicar/:id',
    [
        validarJWT,
    ],
    agregarNumeroRadicado
);

router.delete('/:id' ,borrarDenuncias);


module.exports = router; 