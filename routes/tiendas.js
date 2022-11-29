const {Router} = require('express');
const { check } = require('express-validator');

// const {  validarCampos} = require('../middlewares');

// const {existeTiendaPorId}= require('../helper/db-validators')

const { 
    obtenerTiendas,
    obtenerTienda,
    crearTienda,
    actualizarTienda,
    borrarTienda
         } = require('../controllers/tiendas');


const router = Router();

//** {{url}}/api/tiendas */

//Crear categorías - privado- Cualquier Persona con un token valido.
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //validarCampos
], crearTienda);

//Obtener todas la categorías - publico
router.get('/', obtenerTiendas);

//Obtener una categorías por id - publico
router.get('/:id', [
check('id', 'No es un ID válido').isMongoId(),
// check('id').custom(existeTiendaPorId ),
//validarCampos
], obtenerTienda);

    


        
//Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeTiendaPorId),
    //validarCampos

], actualizarTienda);

    //Borrar una categoría - Admin
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeTiendaPorId), 
    //validarCampos 

], borrarTienda);



module.exports =router;