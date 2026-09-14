const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
require('dotenv').config();

const soap = require('soap');
const path = require('path');
const serviceSOAP = require('./services/soapService');

// Conectar a la base de datos
conectarDB();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Rutas REST API
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// 2. Ruta e integración de SOAP (DEBE ir antes del middleware 404)
const wsdlPath = path.join(__dirname, 'services', 'service.wsdl');

soap.listen(app, '/soap/categorias', serviceSOAP, wsdlPath, () => {
    console.log('Servidor SOAP montado en /soap/categorias');
});

// 3. Middleware 404 para rutas no encontradas (SIEMPRE al final)
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        msg: 'Ruta no encontrada'
    });
});

// Habilita peticiones desde cualquier origen durante el desarrollo

// 4. Iniciar el servidor HTTP
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    
});