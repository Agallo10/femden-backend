/*
    Uploads
    '/api/uploads'
*/

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT , fileUpload);

router.get('/:tipo/:foto' , retornaImagen);

//router.put('/:denuncia/:id' , fileUploadDenuncias);


module.exports = router; 
