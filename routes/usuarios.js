const {Router} = require('express');
const { check } = require('express-validator');

// const {
//       validarCampos,
//       } =  require('../middlewares')

// const {
//        emailExiste,
//        existeUsuarioPorId
//       }= require('../helper/db-validators')

const {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosDelete        
      } = require('../controllers/usuarios');


      
const router = Router();

router.get('/', usuariosGet );

router.post('/',
[
      check('correo', 'El correo no es Valido').isEmail(),
      // check('correo').custom(emailExiste),
      // validarCampos

],
usuariosPost);

router.put('/:id',[
check('id', 'No es un ID válido').isMongoId(),
// check('id').custom(existeUsuarioPorId),

//validarCampos

], usuariosPut );


router.delete('/:id',[
      // check('id').custom(existeUsuarioPorId), 
      // validarCampos   
],usuariosDelete);

module.exports =router;