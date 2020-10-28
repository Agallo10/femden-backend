const {Schema, model} = require('mongoose');

const RolSchema = Schema({

    nombre:{
        type: String,
        required: true,
        unique: true
    },
    
});

RolSchema.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;

})

module.exports = model('Rol', RolSchema); 