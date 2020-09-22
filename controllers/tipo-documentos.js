const { response } = require('express');
const TipoDocumento = require('../models/tipo-documento')

const getTipoDocumentos = async (req, res = response) => {


    const tipoDocumentos = await TipoDocumento.find();

    res.json({
        ok: true,
        tipoDocumentos,
    });
}
const crearTipoDocumentos = async (req, res = response) => {

    //const uid= req.uid;
    const tipoDocumento = new TipoDocumento(req.body);


    try {
        const tipoDocumentoDB = await tipoDocumento.save();

        res.status(200).json({
            ok: true,
            tipoDocumentoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const actualizarTipoDocumentos = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const tipoDocumentoDB = await TipoDocumento.findById(uid);

        if (!tipoDocumentoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un tipo de documento con ese id'
            });
        }

        //Actualizaciones
        const nombre = req.body;

        const tipoActualizado = await TipoDocumento.findByIdAndUpdate(uid, nombre, { new: true });

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
const borrarTipoDocumentos = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const tipoDocumentoDB = await TipoDocumento.findById(uid);

        if (!tipoDocumentoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un tipo de documento con ese id'
            });
        }

        //borrado

        const tipoActualizado = await TipoDocumento.findByIdAndDelete(uid);

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
    getTipoDocumentos,
    crearTipoDocumentos,
    actualizarTipoDocumentos,
    borrarTipoDocumentos
}