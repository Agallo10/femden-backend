const { response } = require('express');
const Cuenta = require('../models/cuenta');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const cuentaDB =  await Cuenta.findOne({ email });

        //verificar email 
        if (!cuentaDB) {

            return res.status(404).json({

                ok: false,
                msg: 'email no encontrado'
            });
        }

        //verificar contraseña
        const validarPassword = bcrypt.compareSync(password, cuentaDB.password);

        if (!validarPassword) {

            return res.status(404).json({

                ok: false,
                msg: 'contraseña no valida'
            });
        }

        //generar el token - JWT
        const token = await generarJWT(cuentaDB.id)

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        res(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    login
}