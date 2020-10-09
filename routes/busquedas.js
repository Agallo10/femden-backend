/*
    Busquedas
    '/api/busquedas'
*/

const { Router } = require('express');

const {getTodo, getDocumentosColeccion} = require("../controllers/busquedas");
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//get
router.get('/:busqueda', validarJWT ,getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT ,getDocumentosColeccion);


module.exports = router; 
