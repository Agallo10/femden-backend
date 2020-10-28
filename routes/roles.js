/*
    Roles
    '/api/roles'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{
    getRoles,
    crearRoles,
    actualizarRoles,
    borrarRoles
} = require('../controllers/roles')

const router = Router();

//get
router.get('/' ,getRoles);


//Post
router.post('/',
    [
        check('nombre','el nombre del rol es necesario').not().isEmpty(),
        validarCampos
    ],
    crearRoles
);

router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarRoles
);

router.delete('/:id' ,borrarRoles);


module.exports = router; 