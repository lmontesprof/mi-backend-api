const Producto=require('../models/Producto');

exports.obtenerProductos=async(req,res)=>{
    try {
        const productos=await Producto.find();
        res.status(200).json({
            ok:true,
            conteo:productos.length,
            datos:productos        
        });
        //res.json(productos);
    } catch (error) {
        //console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al obtener los productos ',
            error: error.message
        });
    }
}

exports.obtenerProductosPorId=async(req,res)=>{
    const id=req.params.id;
    try {
        const producto=await Producto.findById(id);
        if(!producto){
            return res.status(404).json({
                ok:false,
                msg:'Producto no encontrado'
            });
        }
        res.status(200).json({
            ok:true,
            datos:producto        
        });
    } catch (error) {
        //console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al obtener el producto ',
            error: error.message
        });
    }
}

exports.crearProducto=async(req,res)=>{
    try {
        const producto=new Producto(req.body);
        const guardar=await producto.save();
        res.status(201).json({
            ok:true,
            msg:'Producto creado correctamente',
            datos:guardar
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al crear el producto ',
            error: error.message
        });
    }
}       

exports.actualizarProducto=async(req,res)=>{
    const id=req.params.id;
    try {
        const producto=await Producto.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        if(!producto){
            return res.status(404).json({
                ok:false,
                msg:'Producto no encontrado'
            });
        }
        res.status(200).json({
            ok:true,
            msg:'Producto actualizado correctamente',
            datos:producto
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar el producto ',
            error: error.message
        });
    }
}   

exports.eliminarProducto=async(req,res)=>{
    const id=req.params.id;
    try {
        const producto=await Producto.findByIdAndDelete(id);
        if(!producto){
            return res.status(404).json({
                ok:false,
                msg:'Producto no encontrado'
            });
        }
        res.status(200).json({
            ok:true,
            msg:'Producto eliminado correctamente',
            datos:producto
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al eliminar el producto ',
            error: error.message
        });
    }
}   
 



