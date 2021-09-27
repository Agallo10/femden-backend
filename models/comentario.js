const {Schema, model} = require('mongoose');

const ComentsrioSchema = Schema({

    comentario:{
        type: String,
        required: true,
    },
    fecha:{
        type: String,
        required: true,
    },

    cuenta:{
        type: Schema.Types.ObjectId,
        ref: 'Cuenta',
        required: true
    },

    denuncia:{
        type: Schema.Types.ObjectId,
        ref: 'Denuncia',
        required: true
    },
    
});

ComentsrioSchema.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;

})

module.exports = model('Comentario', ComentsrioSchema); 