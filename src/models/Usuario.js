const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    usuario: String,
    senha: String
})

module.exports = mongoose.model('Usuario', UsuarioSchema);