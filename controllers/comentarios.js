const { response } = require('express');
const Comentario = require('../models/comentario');
const { generarJWT } = require('../helpers/jwt');



const getComentarios = async(req, res = response) => {

    //const desde = Number(req.query.desde) || 0;
    const uid = req.params.id;

    const comentarios = await Comentario.find({denuncia: uid})
                                        .populate('cuenta','nombreEncargado');

    res.json({
        ok: true,
        comentarios,
    });
}

const crearComentarios = async (req, res = response) => {

    const comentario = new Comentario(req.body);

    const ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    const fecha = year + "-" + month + "-" + date + ".  " + hours + ":" + minutes + ":" + seconds;

    try {

        if (comentario.fecha == null) {
            comentario.fecha = fecha;
        }

       const comentarioDB = await comentario.save();


       res.status(200).json({
        ok: true,
        comentarioDB
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


const actualizarComentario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const comentarioActualizado = await Comentario.findByIdAndUpdate(uid);

        res.json({
            ok: true,
            cuenta: comentarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}


const borrarComentario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const comentarioBorrada = await Comentario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            cuenta: comentarioBorrada
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
    getComentarios,
    crearComentarios,
    actualizarComentario,
    borrarComentario,
}