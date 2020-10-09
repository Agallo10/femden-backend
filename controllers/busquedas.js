const { response } = require('express');
const Denuncia = require('../models/denuncia');
const Persona = require('../models/persona');

const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [denuncias, personas] = await Promise.all([

        Denuncia.find({texto: regex}),
        Persona.find({nombre: regex})

    ]);

    res.json({
        ok: true,
        msg: 'Busqueta total',
        denuncias,
        personas
    });
}

const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'personas':
            data = await Persona.find({nombre: regex});
            break;
    
        case 'denuncias':
            data = await Denuncia.find({texto: regex}).populate('persona', 'nombre');
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser personas/denuncias'
            });
           
    }

    res.json({
        ok:true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}