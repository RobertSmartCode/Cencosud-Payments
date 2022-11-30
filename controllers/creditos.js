const { response, request } = require("express");

const Credito = require("../models");


//obtenerTiendas - paginado -total -populate
const obtenerCreditos = async (req = request , res = response) => {

   // const {q, nombre = 'No name', apikey, page=1, limit} = req.query;
   const {limite=5, desde=0}=req.query;
   const query = {estado:true};
   
   const [total, creditos] = await Promise.all([
    Tienda.countDocuments(query),
    Tienda.find(query)
   .populate('usuario', 'nombre') //Revisar que es populate
   .skip(Number(desde))
   .limit(Number(limite))
   ])
 
    res.json({
      total, 
      creditos
    });
  }

//obtenerCreditos - populate {}
  const obtenerCredito = async (req = request , res = response) => {
    const {id}= req.params;
    const credito = await Credito.findById(id)
                                      .populate('usuario', 'nombre');
    //const usuarioAutenticado = req.usuario
    res.json(credito);
}


const crearCredito = async (req, res = response)=>{

    const nombre= req.body.nombre.toUpperCase();

    const creditoDB= await Credito.findOne({nombre});

    if(creditoDB){
        return res.status(400).json({
            msg : `La tienda ${creditoDB.nombre} ya existe`
        })
    }
  //  Generar la data a guardar
    const data ={
        nombre,
        usuario: req.body.usuarioID
    }

    const credito = new Credito(data);
    //Guardar en BD
    await credito.save();

    res.status(201).json(credito);
}


//actuallizarCategoria

const actualizarCredito =  async (req, res = response)=> {
    const {id} = req.params;
    let {nombre} = req.body;
    nombre = nombre.toUpperCase();

    const credito = await Credito.findByIdAndUpdate(id, {nombre}, {new: true});
    
res.json(credito);
}

//borrarTienda -estado-false

const borrarCredito =  async (req, res = response)=> {

    const {id}= req.params;

    //Borrar físicamente
   // const tienda = await Tienda.findByIdAndDelete(id);

    const credito = await Credito.findByIdAndUpdate(id, {estado:false}, {new: true});
    //const usuarioAutenticado = req.usuario
    res.json(credito);
  }


module.exports = {
    obtenerCreditos,
    obtenerCredito,
    crearCredito,
    actualizarCredito,
    borrarCredito
}











