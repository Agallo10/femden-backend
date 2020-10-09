const Cuenta = require('../models/cuenta');
const Denuncia = require('../models/denuncia');
const fs = require('fs');

const actualizarImagen = async(tipo, id, nombreArchivo) =>{

    switch (tipo) {
        case 'cuentas':
            const cuenta = await Cuenta.findById(id);
            if (!cuenta) {
                console.log('no se encontro la cuenta');
                return false;
            }

            const pathViejo = `./uploads/cuentas/${cuenta.imagen}`;
            if (fs.existsSync(pathViejo)) {
                //Borrar imagen anterior
                fs.unlinkSync(pathViejo);
            }

            cuenta.imagen= nombreArchivo;
            await cuenta.save();
            return true;
            
            break;

        case 'denuncias':
            
            break;
    
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}