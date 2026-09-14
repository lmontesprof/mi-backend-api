const mongooose = require('mongoose');


const CategoriaSchema = new mongooose.Schema({
    nombre: {
        type: String,
        required: [true,' El nombre de la categoría es obligatorio'],
        unique: true,trim: true
    },
    descripcion:{
        type: String,
        trim: true
    },
},
{
    timestamps: true
}
);

module.exports = mongooose.model('Categoria', CategoriaSchema);