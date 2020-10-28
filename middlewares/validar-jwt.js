const jwt = require('jsonwebtoken');
const Cuenta = require('../models/cuenta');


const validarJWT = (req, res, next) =>{

    //leer el token
    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            ok:false,
            msg: 'No hay token en la peticion'
        });
        
    }

    try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        
        next();

    } catch (error) {

        return res.status(401).json({
            ok:false,
            msg: 'Token no valido'
        });
        
    }


}

const validarAdminRol = async (req, res, next) =>{

    const uid = req.uid;

    try {

        const cuentaDB = await Cuenta.findById(uid);

        const rolString = String(cuentaDB.rol);

        if (!cuentaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'La cuenta es inexistente'
            });
        }

        if (rolString !== '5f9738ae40cb934fbccd96d6') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin papi'
        });
    }
  }

module.exports={
    validarJWT,
    validarAdminRol
}