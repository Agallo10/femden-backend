const Cuenta = require('../models/cuenta');
const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const { enviarEmail } = require('../helpers/nodeMailer');

const getCuentas = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [cuentas, total] = await Promise.all([

        Cuenta.find().populate('cuenta','nombre').populate('rol').populate('tipoEntidad')
                                    .skip(desde)
                                    .limit(5),

        Cuenta.countDocuments()
    ]);

    res.json({
        ok: true,
        cuentas,
        total
    });
}

const getCuenasTipo = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const uid = req.params.id;

    if (uid == "5f699befedf61a95472b451b") {

        const [cuentas, total] = await Promise.all([

            Cuenta.find({
                tipoEntidad: {
                    $in: ['5f699befedf61a95472b451b']
                }
            })
            .populate('cuenta','nombre').populate('rol').populate('tipoEntidad')
            .skip(desde)
            .limit(5),

                Cuenta.find({ tipoEntidad: uid }).countDocuments()
        ]);

        res.json({
            ok: true,
            cuentas,
            total
        });
    }

    if (uid == "5f699c2eedf61a95472b451c") {

        const [cuentas, total] = await Promise.all([

            Cuenta.find({
                tipoEntidad: {
                    $in: ['5f699c2eedf61a95472b451c']
                }
            })
            .populate('cuenta','nombre').populate('rol').populate('tipoEntidad')
            .skip(desde)
            .limit(5),

                Cuenta.find({ tipoEntidad: uid }).countDocuments()
        ]);

        res.json({
            ok: true,
            cuentas,
            total
        });
    }

    if (uid == "60255249364b7844ae8b660c") {

        const [cuentas, total] = await Promise.all([

            Cuenta.find({
                tipoEntidad: {
                    $in: ['60255249364b7844ae8b660c']
                }
            })
            .populate('cuenta','nombre').populate('rol').populate('tipoEntidad')
            .skip(desde)
            .limit(5),

                Cuenta.find({ tipoEntidad: uid }).countDocuments()
        ]);

        res.json({
            ok: true,
            cuentas,
            total
        });
    }

    else {

        const [cuentas, total] = await Promise.all([

            Cuenta.find().populate('cuenta','nombre').populate('rol').populate('tipoEntidad')
                                        .skip(desde)
                                        .limit(5),
    
            Cuenta.countDocuments()
        ]);
    
        res.json({
            ok: true,
            cuentas,
            total
        });

    }


}

const crearCuenta = async (req, res = response) => {

    const { email, password, } = req.body;

    const uid = req.params.id; 

    try {

        const existeEmail = await Cuenta.findOne({ email });

        if (existeEmail) {

            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const cuenta = new Cuenta(req.body);


        //const tipoEntidadDB = await Cuenta.findOne({tipoEntidad});

        if (uid != '5f97389f40cb934fbccd96d5') {
            
            cuenta.tipoEntidad = uid;
        }

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        cuenta.password = bcrypt.hashSync(password, salt)

        //guardar usuario
        await cuenta.save();
        enviarEmail(req, res, 'femden',email,'cuenta creada', `su cuenta ${email} ha sido creada`);

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
            cuenta: cuentaActualizada
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
    getCuenasTipo,
    crearCuenta,
    actualizarCuenta,
    borrarCuenta
}