const { response } = require("express");
const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require("../helpers/actualizar-imagen");


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['cuentas', 'denuncias'];

    //Validar tipo
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una cuenta o una Denuncia (tipo)'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //Procesar la imagen

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); //separacion por puntos ejm: imagen.1.2.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    //Generar el nombre del Archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok:false,
                msg: 'Error al mover la imagen'
            });
        }
        //Actualizar base de datoa
        actualizarImagen(tipo, id, nombreArchivo);
        
        res.json({
            ok: true,
            msg:'Archivo subido',
            nombreArchivo
        });
    });
}

const retornaImagen = (req, res= response) =>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
        
    } else {

        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

// const fileUploadDenuncias = (req, res= response) =>{

//     const denuncia = req.params.denuncia;
//     const id = req.params.id;
//     const tiposValidos = ['denuncias'];

//     //Validar tipo
//     if (!tiposValidos.includes(tipo)) {
//         return res.status(400).json({
//             ok:false,
//             msg: 'No es una Denuncia (tipo)'
//         });
//     }

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).json({
//             ok:false,
//             msg: 'No hay ningun archivo'
//         });
//     }

//Procesar la imagen

//     const file= req.files.imagen;

//     console.log(file);


//     res.json({
//         ok:true,
//         msg: 'fileUpload'
//     });
// }

module.exports = {
    fileUpload,
    retornaImagen
}