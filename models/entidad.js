const {Schema, model} = require('mongoose');

const EntidadSchema = Schema({

    nombre:{
        type: String,
        required: true,
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
    tipoEntidad:{
        type: Schema.Types.ObjectId,
        ref: 'Entidad',
        required: true
    },
});

EntidadSchema.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;

})

module.exports = model('Entidad', EntidadSchema); 