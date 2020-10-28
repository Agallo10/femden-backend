const {Schema, model} = require('mongoose');

const CuentaSchema = Schema({

    nombre:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    rol:{
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: true
    },
    google:{
        type: Boolean,
        default: false,
    },

    imagen:{
        type: String,
    }
});

CuentaSchema.method('toJSON', function(){

    const {__v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;

})

module.exports = model('Cuenta', CuentaSchema); 