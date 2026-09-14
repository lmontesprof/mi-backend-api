const express = require('express');
const router=express.Router();
const productoController=require('../controllers/productoController');

//Configuración de rutas y métodos

router.route('/')
.get(productoController.obtenerProductos)
.post(productoController.crearProducto);

router.route('/:id')
.get(productoController.obtenerProductosPorId)
.put(productoController.actualizarProducto)
.delete(productoController.eliminarProducto);

module.exports=router;