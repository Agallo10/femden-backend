const {response} = require('express');
const Denuncia = require('../models/denuncia')




const getDenuncias = async(req, res = response)=> {

    const desde = Number(req.query.desde) || 0;

    // const denuncias = await Denuncia.find()
    //                                 .populate('persona','nombre')
    //                                 .skip(desde)
    //                                 .limit(5);

    // const total = await Denuncia.count();

    const [denuncias, total] = await Promise.all([

        Denuncia.find().populate('persona').populate('tipo')
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

const getDenunciasPersonas = async(req, res = response)=> {

    const uid = req.params.id;

    const [denuncias, total] = await Promise.all([

        Denuncia.find({persona: uid}).populate('tipo'),

        Denuncia.find({persona: uid}).countDocuments()
    ]);

    res.json({
        ok: true,
        denuncias,
        total
    });
}


const crearDenuncias = async(req, res = response)=> {

    const fecha= Date.now();

    const denuncia = new Denuncia(req.body);
    

    try {

        if (denuncia.fecha == null) {
            denuncia.fecha = fecha;            
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
const actualizarDenuncias =(req, res = response)=> {

    res.json({
        ok:true,
        msg:"actualizarDenuncias"
    });
}
const borrarDenuncias =(req, res = response)=> {

    res.json({
        ok:true,
        msg:"borrarDenuncias "
    });
}

module.exports ={
    getDenuncias,
    crearDenuncias,
    actualizarDenuncias,
    borrarDenuncias,
    getDenunciasPersonas
}