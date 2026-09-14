const Categoria = require('../models/Categoria');

console.log('Servicio SOAP cargado correctamente');

const serviceSOAP = {
    CategoriaService: {
        CategoriaServicePort: {
            obtenerCategorias: async function(args) {
                try {
                    const categorias = await Categoria.find();
                    console.log('Categorías obtenidas:', categorias);

                    const resultado = JSON.stringify(categorias);
                    return { respuesta: resultado };
                } catch (error) {
                    throw {
                        Fault: {
                            Code: { Value: 'SOAP-ENV:Server' },
                            Reason: { Text: 'Error al obtener las categorías' },
                            Detail: { Error: error.message }
                        }
                    };
                }
            }
        }
    }
};

module.exports = serviceSOAP;