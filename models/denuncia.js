const {Schema, model} = require('mongoose');

const DenunciaSchema = Schema({

    texto:{
        type: String,
        required: true,
    },
    fecha:{
        type: Date,
        required: true,
    },
    persona:{
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },

    tipo:{
        type: Schema.Types.ObjectId,
        ref: 'TipoDenuncia',
        required: true
    },

    estado:{
        type: String,
        required: true
    }
});

DenunciaSchema.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;

})

module.exports = model('Denuncia', DenunciaSchema); 