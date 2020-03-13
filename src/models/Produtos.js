const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    codigo: Number,
    descricao: String,
    preco_unitario: Number
})

module.exports = mongoose.model('Produto', ProdutoSchema);