const { response } = require('express');
const Rol = require('../models/rol')

const getRoles = async (req, res = response) => {


    const roles = await Rol.find();

    res.json({
        ok: true,
        roles,
    });
}

const crearRoles = async (req, res = response) => {

    //const uid= req.uid;
    const rol = new Rol(req.body);


    try {
        const rolDB = await rol.save();

        res.status(200).json({
            ok: true,
            rolDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const actualizarRoles = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const rolDB = await Rol.findById(uid);

        if (!rolDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un rol con ese id'
            });
        }

        //Actualizaciones
        const nombre = req.body;

        const rolActualizado = await Rol.findByIdAndUpdate(uid, nombre, { new: true });

        res.json({
            ok: true,
            estado: rolActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const borrarRoles = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const rolDB = await Rol.findById(uid);

        if (!rolDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un rol con ese id'
            });
        }

        //borrado

        const rolActualizado = await Rol.findByIdAndDelete(uid);

        res.json({
            ok: true,
            estado: rolActualizado
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
    getRoles,
    crearRoles,
    actualizarRoles,
    borrarRoles,
}