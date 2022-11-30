const { Schema, model } = require('mongoose');

const CreditoSchema = Schema({
    estado: {
        type : Boolean,
        default: true,
        required :true
    },
    nombre: {
        type: String,
        required: [true, 'Nombre de la tienda es Obligatorio'],
        unique : true
    },
    cantidad:{
        type : Number,
        default: 0,
        required :true
    },
  
    usuario:{
        type : Schema.Types.ObjectId,
        ref: 'Usuario',
        required :true
    }
});

CreditoSchema.methods.toJSON = function(){
    const {__v, _id, estado, ...data} = this.toObject();
    data.uid = _id;
    return data;
}


module.exports = model( 'Credito', CreditoSchema );