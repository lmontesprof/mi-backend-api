const express = require('express');
const router=express.Router();
const categoriaController=require('../controllers/categoriaController');

//Configuración de rutas y métodos

router.route('/')
.get(categoriaController.obtenerCategorias)
.post(categoriaController.crearCategoria);

router.route('/:id')
.get(categoriaController.obtenerCategoriasPorId)
.put(categoriaController.actualizarCategoria)
.delete(categoriaController.eliminarCategoria);

module.exports=router;