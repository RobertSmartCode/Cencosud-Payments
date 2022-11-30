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
    }
});

TiendaSchema.methods.toJSON = function(){
    const {__v, _id, estado, ...data} = this.toObject();
    data.uid = _id;
    return data;
}


module.exports = model( 'Tienda', TiendaSchema );