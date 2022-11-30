const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    estado :{
        type : Boolean,
        default : true
    },
    correo :{
        type : String,
        required : [true, 'El correo es obligatorio'],
        unique : true
    }
   
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports =model('Usuario', UsuarioSchema );