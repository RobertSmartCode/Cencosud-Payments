const { response, request } = require("express");

const {Credito, Usuario, Tienda} = require("../models");


const crearCredito = async (req, res = response)=>{

  let {correo,tienda,cantidad} = req.body;

  //Verificar que el usuario esté registrado

  const usuarioDB= await Usuario.findOne({correo});
  if(!usuarioDB){
    return res.status(400).json({
      msg : `El usuario ${correo} no está registrado`
  })
  }
  const {__v, _id, ...usuario} = usuarioDB;
  usuario.uid = _id;

  //Verificar que la tienda esté en la base de datos

  let nombre= tienda
  const tiendaDB= await Tienda.findOne({nombre});
  if(!tiendaDB){
    return res.status(400).json({
      msg : `La tienda ${tienda} no está registrada en la base de datos`
  })
  }

  tienda= tienda.toUpperCase();
  const creditoDB= await Credito.findOne({tienda,correo});

  if(creditoDB){   
  
       if((creditoDB.tienda === tienda) && (creditoDB.correo === correo)){
   
        return res.status(400).json({
          msg : `El usuario ${correo} ya tiene registrado un crédito con la tienda ${tienda}`
       })
  }
     
  }
//  Generar la data a guardar
  const data ={
      tienda,
      cantidad,
      correo,
      usuario:  usuario.uid 
  }

  const credito = new Credito(data);
  //Guardar en BD
  await credito.save();

  res.status(201).json(credito);
}


//obtenerTiendas - paginado -total -populate
const obtenerCreditos = async (req = request , res = response) => {

   // const {q, nombre = 'No name', apikey, page=1, limit} = req.query;
   const {limite=5, desde=0}=req.query;
   const query = {estado:true};
   
   const [total, creditos] = await Promise.all([
    Credito.countDocuments(query),
    Credito.find(query)
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
    let {correo,tienda} = req.body;

    //Verificar que el usuario esté registrado

  const usuarioDB= await Usuario.findOne({correo});
  if(!usuarioDB){
    return res.status(400).json({
      msg : `El usuario ${correo} no está registrado`
  })
  }

  //Verificar que la tienda esté en la base de datos

  let nombre= tienda
  const tiendaDB= await Tienda.findOne({nombre});
  if(!tiendaDB){
    return res.status(400).json({
      msg : `La tienda ${tienda} no está registrada en la base de datos`
  })
  }

    const creditoDB= await Credito.findOne({tienda,correo});
  
    if(!creditoDB){
      return res.status(400).json({
        msg : `El usuario ${correo} no está registrado en la tienda ${tienda}`
    })
      
    }
    res.json(`El usuario ${correo} tiene un credito de ${creditoDB.cantidad} en la tienda ${tienda}`);
   
}


//actuallizarCategoria

const actualizarCredito =  async (req, res = response)=> {

    let {correo, cantidad, tienda} = req.body;
    
  //Verificar que la tienda esté en la base de datos

  let nombre= tienda
  const tiendaDB= await Tienda.findOne({nombre});
  if(!tiendaDB){
    return res.status(400).json({
      msg : `La tienda ${tienda} no está registrada en la base de datos`
  })
  }

   //Verificar que el usuario esté registrado
  const usuarioDB= await Usuario.findOne({correo});
  if(!usuarioDB){
    return res.status(400).json({
      msg : `El usuario ${correo} no está registrado`
  })
  }

  const creditoDB= await Credito.findOne({tienda,correo});
  
  if(!creditoDB){
    return res.status(400).json({
      msg : `El usuario ${correo} no está registrado en la tienda ${tienda}`
  })
  }

  let viejaCantidad=cantidad
    cantidad = Number(cantidad)+Number(creditoDB.cantidad)
   if(cantidad <0){
    return res.status(400).json({
      msg : `El monto a debitar de ${-(viejaCantidad)} supera al crédito de ${creditoDB.cantidad}`
  })
   }
      const credito = await Credito.findByIdAndUpdate(creditoDB.id, {cantidad}, {new: true});
    
   res.json(credito.cantidad);
}

//borrarTienda -estado-false

const borrarCredito =  async (req, res = response)=> {

  let {correo,tienda} = req.body;

  //Verificar que el usuario esté registrado

  const usuarioDB= await Usuario.findOne({correo});
  if(!usuarioDB){
    return res.status(400).json({
      msg : `El usuario ${correo} no está registrado`
  })
  }

  //Verificar que la tienda esté en la base de datos

  let nombre= tienda
  const tiendaDB= await Tienda.findOne({nombre});
  if(!tiendaDB){
    return res.status(400).json({
      msg : `La tienda ${tienda} no está registrada en la base de datos`
  })
  }

   //Borrar físicamente
   // const tienda = await Tienda.findByIdAndDelete(id);
   const creditoDB= await Credito.findOne({tienda,correo});
  
   if(!creditoDB){
     return res.status(400).json({
       msg : `El usuario ${correo} no está registrado en la tienda ${tienda}`
   })
   }

    const credito = await Credito.findByIdAndUpdate(creditoDB._id, {estado:false}, {new: true});
  
    res.json(credito);
  }


module.exports = {
    obtenerCreditos,
    obtenerCredito,
    crearCredito,
    actualizarCredito,
    borrarCredito
}











