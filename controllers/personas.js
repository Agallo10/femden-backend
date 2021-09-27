const { response } = require('express');
const Persona = require('../models/persona');
const { generarJWT } = require('../helpers/jwt');



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

        
        if (persona.edad <18) {
            res.status(401).json({
                ok: false,
                msg: 'Debe ser mayor de 18 años, comuniquese con la linea de atención 141 del bienestar familiar'
            })
               
        }

       const personaDB = await persona.save();

       const token = await generarJWT(personaDB.id);

       

       res.status(200).json({
        ok: true,
        token,
        personaDB
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'El documento o el email ya estan registrados'
        })
    }
}


const getPersona = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const persona = await Persona.findById(uid)
            .populate('nombre')
            .populate('documento')
            .populate('telefono')
            .populate('direccion')
            .populate('email');

        res.json({
            ok: true,
            persona
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el admin'
        });
    }


}
const actualizarPersonas = (req, res = response) => {

    res.json({
        ok: true,
        msg: "actualizarPersonas"
    });
}


const borrarPersonas = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const personaBorrada = await Persona.findByIdAndDelete(uid);

        res.json({
            ok: true,
            cuenta: personaBorrada
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
    getPersonas,
    getPersona,
    crearPersonas,
    actualizarPersonas,
    borrarPersonas
}