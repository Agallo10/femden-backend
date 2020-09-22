const { response } = require('express');
const EstadoDenuncia = require('../models/estado-denuncia')




const getEstadoDenuncias = async (req, res = response) => {


    const estadoDenuncias = await EstadoDenuncia.find();

    res.json({
        ok: true,
        estadoDenuncias,
    });
}
const crearEstadoDenuncias = async (req, res = response) => {

    //const uid= req.uid;
    const estadoDenuncia = new EstadoDenuncia(req.body);


    try {
        const estadoDenunciaDB = await estadoDenuncia.save();

        res.status(200).json({
            ok: true,
            estadoDenunciaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}
const actualizarEstadoDenuncias = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const estadoDenunciaDB = await EstadoDenuncia.findById(uid);

        if (!estadoDenunciaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un estado de denuncia con ese id'
            });
        }

        //Actualizaciones
        const nombre = req.body;

        const estadoActualizado = await EstadoDenuncia.findByIdAndUpdate(uid, nombre, { new: true });

        res.json({
            ok: true,
            estado: estadoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const borrarEstadoDenuncias = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const estadoDenunciaDB = await EstadoDenuncia.findById(uid);

        if (!estadoDenunciaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un estado de denuncia con ese id'
            });
        }

        //borrado

        const estadoActualizado = await EstadoDenuncia.findByIdAndDelete(uid);

        res.json({
            ok: true,
            estado: estadoActualizado
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
    getEstadoDenuncias,
    crearEstadoDenuncias,
    actualizarEstadoDenuncias,
    borrarEstadoDenuncias
}