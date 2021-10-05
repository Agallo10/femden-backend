const { response } = require('express');
const Denuncia = require('../models/denuncia');
const Persona = require('../models/persona');




const getDenuncias = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    // const denuncias = await Denuncia.find()
    //                                 .populate('persona','nombre')
    //                                 .skip(desde)
    //                                 .limit(5);

    // const total = await Denuncia.count();

    const [denuncias, total] = await Promise.all([

        Denuncia.find().populate('persona').populate('tipo').populate('estado')
            .skip(desde)
            .limit(5),

        Denuncia.countDocuments()
    ]);


    res.json({
        ok: true,
        denuncias,
        total
    });
}

const getDenunciasPersonas = async (req, res = response) => {

    const uid = req.params.id;

    const [denunciasSeg, denunciasFis, denunciasFin, total] = await Promise.all([

        Denuncia.find({ 
            persona: uid,
            estado: { $in: ["5f696f27a339288e287dd956"] }
        })
            .populate('tipo', 'nombre')
            .populate('estado', 'nombre'),

        Denuncia.find({
            persona: uid,
            estado: { $in: ["5f69725e25a48d8ecfb3031c"] }
        })
            .populate('tipo', 'nombre')
            .populate('estado', 'nombre'),

        Denuncia.find({
            persona: uid,
            estado: { $in: ["5f697dc62a858e901406ed45"] }
        })
            .populate('tipo', 'nombre')
            .populate('estado', 'nombre'),

        Denuncia.find({ persona: uid }).countDocuments()
    ]);

    res.json({
        ok: true,
        denunciasSeg,
        denunciasFis,
        denunciasFin,
        total
    });
}


const getDenunciasTipo = async (req, res = response) => {



    const uid = req.params.id;

    if (uid == "5f699befedf61a95472b451b") {

        const desde = Number(req.query.desde) || 0;

        const [denuncias, total] = await Promise.all([

            Denuncia.find({
                tipo: {
                    $in: ['5f8e633189766e1bdf4bb3c6', '5f8e631789766e1bdf4bb3c4']
                }
            })
                .populate('persona').populate('tipo').populate('estado', 'nombre')
                .skip(desde)
                .limit(5),

            Denuncia.countDocuments({
                tipo: {
                    $in: ['5f8e633189766e1bdf4bb3c6', '5f8e631789766e1bdf4bb3c4']
                }
            })
        ]);

        res.json({
            ok: true,
            denuncias,
            total
        });
    }

    if (uid == "5f699c2eedf61a95472b451c") {

        const desde = Number(req.query.desde) || 0;

        const [denuncias, total] = await Promise.all([

            Denuncia.find({
                tipo: {
                    $in: ['5f8e631789766e1bdf4bb3c4', '5f8e633c89766e1bdf4bb3c7', '5f8e632789766e1bdf4bb3c5']
                }
            })
                .populate('persona').populate('tipo').populate('estado', 'nombre')
                .skip(desde)
                .limit(5),

            Denuncia.countDocuments({
                tipo: {
                    $in: ['5f8e631789766e1bdf4bb3c4', '5f8e633c89766e1bdf4bb3c7', '5f8e632789766e1bdf4bb3c5']
                }
            })
        ]);



        res.json({
            ok: true,
            denuncias,
            total,
        });
    }

    if (uid == "60255249364b7844ae8b660c") {

        const desde = Number(req.query.desde) || 0;

        const [denuncias, total] = await Promise.all([

            Denuncia.find({
                estado: '5f69725e25a48d8ecfb3031c'

            })
                .populate('persona').populate('tipo').populate('estado', 'nombre')
                .skip(desde)
                .limit(5),

            Denuncia.countDocuments({
                estado: '5f69725e25a48d8ecfb3031c'

            })
        ]);

        res.json({
            ok: true,
            denuncias,
            total
        });
    }

    else {

        const desde = Number(req.query.desde) || 0;

        const [denuncias, total] = await Promise.all([

            Denuncia.find().populate('persona').populate('tipo').populate('estado', 'nombre')
                .skip(desde)
                .limit(5),

            Denuncia.countDocuments()
        ]);


        res.json({
            ok: true,
            denuncias,
            total
        });

    }


}

const getDenunciasUid = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const denuncia = await Denuncia.findById(uid)
            .populate('tipo', 'nombre')
            .populate('persona', 'nombre')
            .populate('estado', 'nombre');

        res.json({
            ok: true,
            denuncia
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el admin'
        });
    }


}


const crearDenuncias = async (req, res = response) => {

    const ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    const fecha = year + "-" + month + "-" + date + ".  " + hours + ":" + minutes + ":" + seconds;

    const estado = '5f696f27a339288e287dd956';

    const denuncia = new Denuncia(req.body);

    try {

        if (denuncia.fecha == null) {
            denuncia.fecha = fecha;
        }

        if (denuncia.estado == null) {
            denuncia.estado = estado;
        }

        if (denuncia.autor == null) {
            denuncia.autor = 'No se ha puesto el autor';
        }
        
        const denunciaDB = await denuncia.save();

        res.status(200).json({
            ok: true,
            denunciaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}
const actualizarDenuncias = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const denunciaDB = await Denuncia.findById(uid);

        if (!denunciaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una denuncia con este id'
            });
        }

        estado = denunciaDB.estado;


        const denunciaActualizada = await Denuncia.findByIdAndUpdate(uid, { estado: '5f69725e25a48d8ecfb3031c' }, { new: true });

        console.log('se actualizo');
        console.log(denunciaActualizada.estado);

        res.json({
            ok: true,
            msj: "Se actualizo la denuncia",
            denuncia: denunciaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

const actualizarDenuncias2 = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const denunciaDB = await Denuncia.findById(uid);

        estado = denunciaDB.estado;

        const denunciaActualizada = await Denuncia.findByIdAndUpdate(uid, { estado: '5f697dc62a858e901406ed45' }, { new: true });

        console.log('se actualizo');
        console.log(denunciaActualizada.estado);

        res.json({
            ok: true,
            msj: "Se actualizo la denuncia",
            denuncia: denunciaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}
const borrarDenuncias = (req, res = response) => {

    res.json({
        ok: true,
        msg: "borrarDenuncias "
    });
}

module.exports = {
    getDenuncias,
    crearDenuncias,
    actualizarDenuncias,
    actualizarDenuncias2,
    borrarDenuncias,
    getDenunciasPersonas,
    getDenunciasUid,
    getDenunciasTipo
}