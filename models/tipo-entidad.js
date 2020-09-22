const {Schema, model} = require('mongoose');

const TipoEntidadSchema = Schema({

    nombre:{
        type: String,
        required: true,
        unique: true
    },
    
},{collection: 'tipo-entidades'});

TipoEntidadSchema.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;

});

module.exports = model('TipoEntidad', TipoEntidadSchema); 