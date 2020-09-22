const { response } = require('express');
const TipoEntidad = require('../models/tipo-entidad')

const getTipoEntindad = async (req, res = response) => {


    const tipoEntidades = await TipoEntidad.find();

    res.json({
        ok: true,
        tipoEntidades,
    });
}
const crearTipoEntindad = async (req, res = response) => {

    //const uid= req.uid;
    const tipoEntidad = new TipoEntidad(req.body);


    try {
        const tipoEntidadDB = await tipoEntidad.save();

        res.status(200).json({
            ok: true,
            tipoEntidadDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const actualizarTipoEntindad = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const tipoEntidadDB = await TipoEntidad.findById(uid);

        if (!tipoEntidadDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un tipo de entidad con ese id'
            });
        }

        //Actualizaciones
        const nombre = req.body;

        const tipoActualizado = await TipoEntidad.findByIdAndUpdate(uid, nombre, { new: true });

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
const borrarTipoEntindad = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const tipoEntidadDB = await TipoEntidad.findById(uid);

        if (!tipoEntidadDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un tipo de entidad con ese id'
            });
        }

        //borrado

        const tipoActualizado = await TipoEntidad.findByIdAndDelete(uid);

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
    getTipoEntindad,
    crearTipoEntindad,
    actualizarTipoEntindad,
    borrarTipoEntindad
}