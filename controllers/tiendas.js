const { response, request } = require("express");

const {Tienda } = require("../models");


//obtenerTiendas - paginado -total -populate
const obtenerTiendas = async (req = request , res = response) => {

   // const {q, nombre = 'No name', apikey, page=1, limit} = req.query;
   const {limite=5, desde=0}=req.query;
   const query = {estado:true};
   
   const [total, tiendas] = await Promise.all([
    Tienda.countDocuments(query),
    Tienda.find(query)
   .populate('usuario', 'nombre')
   .skip(Number(desde))
   .limit(Number(limite))
   ])
 
    res.json({
      total, 
      tiendas
    });
  }

  //obtenerTienda - populate {}
const obtenerTienda = async (req = request , res = response) => {
    const {id}= req.params;
    const tienda = await Tienda.findById(id)
                                      .populate('usuario', 'nombre');
    //const usuarioAutenticado = req.usuario
    res.json(tienda);
}


const crearTienda = async (req, res = response)=>{

    const nombre= req.body.nombre.toUpperCase();
    const usuarioId=req.body.usuarioId

    const tiendaDB= await Tienda.findOne({nombre});
    const usuarioDB= await Tienda.findOne({usuarioId});
    console.log(usuarioDB)
    if(tiendaDB && usuarioDB ){
        return res.status(400).json({
            msg : `La tienda ${tiendaDB.nombre} ya existe`
        })
    }
    //Generar la data a guardar
    const data ={
        nombre,
        usuario: req.body.usuarioId
    }

    const tienda = new Tienda(data);
    //Guardar en BD
    await tienda.save();

    res.status(201).json(tienda);


}

//actuallizarCategoria

const actualizarTienda =  async (req, res = response)=> {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const tienda = await Tienda.findByIdAndUpdate(id, data, {new: true});
    
res.json(tienda);
}

//borrarCategoria -estado-false

const borrarTienda =  async (req, res = response)=> {

    const {id}= req.params;

    //Borrar físicamente
   // const tienda = await Tienda.findByIdAndDelete(id);

    const tienda = await Tienda.findByIdAndUpdate(id, {estado:false}, {new: true});
    //const usuarioAutenticado = req.usuario
    res.json(tienda);
  }


module.exports = {
    obtenerTiendas,
    obtenerTienda,
    crearTienda,
    actualizarTienda,
    borrarTienda
}