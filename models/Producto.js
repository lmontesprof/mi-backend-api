const mongooose = require('mongoose');

const ProductoSchema = new mongooose.Schema({
    nombre: {
        type: String,
        required: [true,' El nombre del producto es obligatorio'],
        unique: true,trim: true
    },
    precio:{
        type: Number,
        required: [true,' El precio del producto es obligatorio'],
        min: [0,' El precio del producto debe ser un valor positivo']
    },

    // Relacion 1:N 
    categoria:{
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true,' La categoría del producto es obligatoria']
    },
    enStock:{
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
);

module.exports = mongooose.model('Producto', ProductoSchema);