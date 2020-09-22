const {Schema, model} = require('mongoose');

const TipoDocumentoSchema = Schema({

    nombre:{
        type: String,
        required: true,
        unique: true
    },
    
});

TipoDocumentoSchema.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;

})

module.exports = model('TipoDocumento', TipoDocumentoSchema); 