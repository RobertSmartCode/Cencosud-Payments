const { Schema, model } = require('mongoose');

const TiendaSchema = Schema({
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
    credito: {
        type: Number,
        default: 0,
        required :true
    },
  
    usuario:{
        type : Schema.Types.ObjectId,
        ref: 'Usuario',
        required :true
    }
});

TiendaSchema.methods.toJSON = function(){
    const {__v, estado, ...data} = this.toObject();
    return data;
}


module.exports = model( 'Tienda', TiendaSchema );