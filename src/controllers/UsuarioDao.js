const Usuario = require('../models/Usuario');

module.exports.adicionar = async (user) => {
    const {usuario, senha} = user;
    try {
        return await Usuario.create({
            usuario: usuario,
            senha
        });
    } catch (error) { return error; }
}

module.exports.listar = async () => {
    try {
        return await Usuario.find();
    } catch (error) { return error; }

}

module.exports.excluir = async (usuario) => {
    try {
        return await Usuario.findByIdAndDelete(usuario._id);
    } catch (error) { return error; }
}