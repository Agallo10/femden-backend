const { response } = require('express');
const Persona = require('../models/persona')


const getPersonas = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [personas, total] = await Promise.all([

        Persona.find().populate('persona','nombre')
                                    .skip(desde)
                                    .limit(5),

        Persona.countDocuments()
    ]);

    res.json({
        ok: true,
        personas,
        total
    });
}
const crearPersonas = async (req, res = response) => {

    const persona = new Persona(req.body);

    try {

       const personaDB = await persona.save();

       res.status(200).json({
        ok: true,
        personaDB
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}
const actualizarPersonas = (req, res = response) => {

    res.json({
        ok: true,
        msg: "actualizarPersonas"
    });
}
const borrarPersonas = (req, res = response) => {

    res.json({
        ok: true,
        msg: "borrarPersonas "
    });
}

module.exports = {
    getPersonas,
    crearPersonas,
    actualizarPersonas,
    borrarPersonas
}