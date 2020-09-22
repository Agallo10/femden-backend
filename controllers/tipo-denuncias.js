const { response } = require('express');
const TipoDenuncia = require('../models/tipo-denuncia')

const getTipoDenuncias = async (req, res = response) => {


    const tipoDenuncias = await TipoDenuncia.find();

    res.json({
        ok: true,
        tipoDenuncias,
    });
}
const crearTipoDenuncias = async (req, res = response) => {

    //const uid= req.uid;
    const tipoDenuncia = new TipoDenuncia(req.body);


    try {
        const tipoDenunciaDB = await tipoDenuncia.save();

        res.status(200).json({
            ok: true,
            tipoDenunciaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const actualizarTipoDenuncias = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const tipoDenunciaDB = await TipoDenuncia.findById(uid);

        if (!tipoDenunciaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un tipo de denuncia con ese id'
            });
        }

        //Actualizaciones
        const nombre = req.body;

        const tipoActualizado = await TipoDenuncia.findByIdAndUpdate(uid, nombre, { new: true });

        res.json({
            ok: true,
            estado: tipoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const borrarTipoDenuncias = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const tipoDenunciaDB = await TipoDenuncia.findById(uid);

        if (!tipoDenunciaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un tipo de denuncia con ese id'
            });
        }

        //borrado

        const tipoActualizado = await TipoDenuncia.findByIdAndDelete(uid);

        res.json({
            ok: true,
            estado: tipoActualizado
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
    getTipoDenuncias,
    crearTipoDenuncias,
    actualizarTipoDenuncias,
    borrarTipoDenuncias
}