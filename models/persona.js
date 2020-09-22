const {Schema, model} = require('mongoose');

const PersonaSchema = Schema({

    nombre:{
        type: String,
        required: true,
    },
    documento:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    telefono:{
        type: Number,
        required:true
    },
    rol:{
        type: String,
        required: true,
    },
    direccion:{
        type: String,
        required:true,
    },
});

PersonaSchema.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;

})

module.exports = model('Persona', PersonaSchema); 