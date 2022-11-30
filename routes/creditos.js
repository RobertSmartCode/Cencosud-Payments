const {Router} = require('express');
const { check } = require('express-validator');

// const {  validarCampos} = require('../middlewares');

// const {existeTiendaPorId}= require('../helper/db-validators')

const { 
    obtenerCreditos,
    obtenerCredito,
    crearCredito,
    actualizarCredito,
    borrarCredito
         } = require('../controllers/creditos');


const router = Router();

//** {{url}}/api/tiendas */

//Crear créditos - privado- Cualquier Persona con un token valido.
router.post('/',[
    //check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //validarCampos
], crearCredito);

//Obtener todas la categorías - publico
router.get('/', obtenerCreditos);

//Obtener una categorías por id - publico
router.get('/:id', [
check('id', 'No es un ID válido').isMongoId(),
// check('id').custom(existeTiendaPorId ),
//validarCampos
], obtenerCredito);

    


        
//Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeTiendaPorId),
    //validarCampos

], actualizarCredito);

    //Borrar una categoría - Admin
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeTiendaPorId), 
    //validarCampos 

], borrarCredito);



module.exports =router;