const { response } = require('express');
const Persona = require('../models/persona');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const loginPersonas = async (req, res = response) => {

    const { email, documento } = req.body;

    try {
        const personaDB =  await Persona.findOne({ email });
        

        //verificar email 
        if (!personaDB) {

            return res.status(404).json({

                ok: false,
                msg: 'email no encontrado'
            });
        }

        //verificar contraseña

        if (documento !== personaDB.documento) {

            return res.status(404).json({

                ok: false,
                msg: 'contraseña no valida'
            });
        }
        //generar el token - JWT
        const token = await generarJWT(personaDB.id);

        console.log('login andando');
        res.json({
            ok: true,
            token,
            persona: personaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const renewToken = async(req, res = response)=>{

    const uid =req.uid;


    const [token, persona] = await Promise.all([

        generarJWT(uid),
        Persona.findById(uid)

    ]);


    //Usuario por uid

    res.json({
        ok:true,
        token,
        persona,
    })

}

module.exports = {
    loginPersonas,
    renewToken
}