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
    
    direccion:{
        type: String,
        required:true,
    },


    fechaNacimiento:{
        type: String,
        required:true,
    },

    edad:{
        type: Number,
        required:true,
    },

   
});

PersonaSchema.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;

})

module.exports = model('Persona', PersonaSchema); 