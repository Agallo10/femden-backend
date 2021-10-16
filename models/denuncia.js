const { Schema, model } = require('mongoose');

const DenunciaSchema = Schema({

    texto: {
        type: String,
        required: true,
    },

    autor: {
        type: String,
        required: true,
    },

    fecha: {
        type: String,
        required: true,
    },
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },

    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDenuncia',
        required: true
    },

    estado: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoDenuncia',
        required: true
    },

    numeroRadicado: {
        type: Number,
        required: true
    }

    
});

DenunciaSchema.method('toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;

})

module.exports = model('Denuncia', DenunciaSchema);