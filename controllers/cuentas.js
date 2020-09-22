const Cuenta = require('../models/cuenta');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getCuentas = async (req, res) => {

    const cuentas = await Cuenta.find()
    res.json({
        ok: true,
        cuentas,
    })
}

const crearCuenta = async (req, res = response) => {

    const { email, password, } = req.body;

    try {

        const existeEmail = await Cuenta.findOne({ email });

        if (existeEmail) {

            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const cuenta = new Cuenta(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        cuenta.password = bcrypt.hashSync(password, salt)

        //guardar usuario
        await cuenta.save();

        //generar el token - JWT
        const token = await generarJWT(cuenta.id)

        res.json({
            ok: true,
            cuenta,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }
}

const actualizarCuenta = async (req, res=response) => {

    const uid = req.params.id;

    try {

        const cuentaDB = await Cuenta.findById(uid);

        if (!cuentaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una cuenta con ese id'
            });
        }

        //Actualizaciones

        const { password, google, email, ...campos } = req.body;

        if (cuentaDB.email != email) {

            const existeEmail = await Cuenta.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una cuenta con ese email'
                });
            }
        }

        campos.email = email;
        const cuentaActualizada = await Cuenta.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: cuentaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

//Borrar Cuenta

const borrarCuenta = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const cuentaDB = await Cuenta.findById(uid);

        if (!cuentaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una cuenta con ese id'
            });
        }

        const cuentaBorrada = await Cuenta.findByIdAndDelete(uid);

        res.json({
            ok: true,
            cuenta: cuentaBorrada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getCuentas,
    crearCuenta,
    actualizarCuenta,
    borrarCuenta
}