const Categoria=require('../models/Categoria');

exports.obtenerCategorias=async(req,res)=>{
    try {
        const categorias=await Categoria.find();
        res.status(200).json({
            ok:true,
            conteo:categorias.length,
            datos:categorias        
        });
        //res.json(categorias);
    } catch (error) {
        //console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al obtener las categorias ',
            error: error.message
        });
    }
}

exports.obtenerCategoriasPorId=async(req,res)=>{
    const id=req.params.id;
    try {
        const categoria=await Categoria.findById(id);
        if(!categoria){
            return res.status(404).json({
                ok:false,
                msg:'Categoria no encontrada'
            });
        }
        res.status(200).json({
            ok:true,
            datos:categoria        
        });
    } catch (error) {
        //console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al obtener la categoria ',
            error: error.message
        });
    }
}


exports.crearCategoria=async(req,res)=>{
    try {
        const categoria=new Categoria(req.body);
        const guardar=await categoria.save();
        res.status(201).json({
            ok:true,
            msg:'Categoria creada correctamente',
            datos:guardar
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al crear la categoria ',
            error: error.message
        });
    }
};

exports.actualizarCategoria=async(req,res)=>{
    const id=req.params.id;
    try {
        const categoria=await Categoria.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        if(!categoria){
            return res.status(404).json({
                ok:false,
                msg:'Categoria no encontrada'
            });
        }
        res.status(200).json({
            ok:true,
            msg:'Categoria actualizada correctamente',
            datos:categoria
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar la categoria ',
            error: error.message
        });         
    }
}

exports.eliminarCategoria=async(req,res)=>{
    const id=req.params.id;
    try {
        const categoria=await Categoria.findByIdAndDelete(id);
        if(!categoria){
            return res.status(404).json({
                ok:false,
                msg:'Categoria no encontrada'
            });
        }
        res.status(200).json({
            ok:true,
            msg:'Categoria eliminada correctamente',
            datos:categoria
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al eliminar la categoria ',
            error: error.message
        });         
    }
}