const Produto = require('../models/Produtos');

module.exports.adicionar = async (produto) => {
    const { codigo, descricao, preco_unitario } = produto;
    try {
        return await Produto.create({
            codigo,
            descricao,
            preco_unitario
        });
    } catch (error) { return error; }
}

module.exports.listar = async () => {
    try {
        return await Produto.find();
    } catch (error) { return error; }

}

module.exports.excluir = async (produto) => {
    try {
        return await Produto.findByIdAndDelete(produto._id);
    } catch (error) { return error; }
}