const {Schema, model} = require('mongoose');

const EstadoDenunciaSchema = Schema({

    nombre:{
        type: String,
        required: true,
        unique: true
    },
    
    porcentaje:{
        type: Number,
        required: true,
        unique: true
    },
});

EstadoDenunciaSchema.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;

})

module.exports = model('EstadoDenuncia', EstadoDenunciaSchema); 