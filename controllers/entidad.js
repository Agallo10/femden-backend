const { response } = require('express');
const Entidad = require('../models/entidad')


const getEntidades = async(req, res = response) => {

    const entidades = await Entidad.find();


    res.json({
        ok: true,
        entidades
    });
}
const crearEntidades = async (req, res = response) => {

    const entidad = new Entidad(req.body);

    try {

       const entidadDB = await entidad.save();

       res.status(200).json({
        ok: true,
        entidadDB
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}
const actualizarEntidades = (req, res = response) => {

    res.json({
        ok: true,
        msg: "actualizarEntidades"
    });
}
const borrarEntidades = (req, res = response) => {

    res.json({
        ok: true,
        msg: "borrarEntidades "
    });
}

module.exports = {
    getEntidades,
    crearEntidades,
    actualizarEntidades,
    borrarEntidades
}