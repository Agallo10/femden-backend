/*
    Comentarios
    '/api/comentarios'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{
    getComentarios,
    crearComentarios,
    actualizarComentario,
    borrarComentario,
} = require('../controllers/comentarios')

const router = Router();

//get
router.get('/:id' ,validarJWT, getComentarios);

//Post
router.post('/',
    [
        validarJWT,
        check('comentario','el comentario de la denuncia es necesario').not().isEmpty(),
        validarCampos,
    ],
    

    crearComentarios
);

//Put

router.put('/:id',
    [
        validarJWT,
        
    ],
    actualizarComentario
);

//Delete

router.delete('/:id' ,borrarComentario);


module.exports = router; 