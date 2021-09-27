const { response } = require('express');
const Cuenta = require('../models/cuenta');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


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
        const token = await generarJWT(cuentaDB.id);

        const rolString = String(cuentaDB.rol);

        const tipoC= cuentaDB.tipoEntidad;
   
        res.json({
            ok: true,
            token,
            tipoEntidad: tipoC,
            menu: getMenuFrontEnd(rolString)
        });

    } catch (error) {
        res(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const renewToken = async(req, res = response)=>{

    const uid =req.uid;


    const [token, cuenta] = await Promise.all([

        generarJWT(uid),
        Cuenta.findById(uid)

    ]);

    const rolString = String(cuenta.rol);

    const tipoC= cuenta.tipoEntidad;

    //Usuario por uid

    res.json({
        ok:true,
        token,
        cuenta,
        tipoEntidad: tipoC,
        menu: getMenuFrontEnd(rolString)
    })

}

module.exports = {
    login,
    renewToken
}