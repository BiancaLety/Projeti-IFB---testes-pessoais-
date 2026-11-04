import {
    listarProdutos as buscarProdutos,
    cadastrarProduto as criarProduto
} from "../services/produtoServices.js";

async function listar(req, res) {
    try {
        const produtos = await buscarProdutos();

        return res.status(200).json(produtos);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao listar produtos"
        });
    }
}

async function cadastrar(req, res) {
    try {
        const {
            nome,
            descricao,
            preco,
            especificacoes,
            disponivel,
            id_categoria,
            id_marca
        } = req.body;

        if (
            typeof nome !== "string" ||
            nome.trim() === "" ||
            preco === undefined ||
            !Number.isFinite(preco) ||
            preco < 0 ||
            !Number.isInteger(id_categoria) ||
            id_categoria <= 0 ||
            !Number.isInteger(id_marca) ||
            id_marca <= 0
        ) {
            return res.status(400).json({
                mensagem: "Dados do produto inválidos ou incompletos"
            });
        }

        if (
            disponivel !== undefined &&
            typeof disponivel !== "boolean"
        ) {
            return res.status(400).json({
                mensagem: "O campo disponivel deve ser booleano"
            });
        }

        const produto = await criarProduto({
            nome,
            descricao,
            preco,
            especificacoes,
            disponivel,
            id_categoria,
            id_marca
        });

        return res.status(201).json({
            mensagem: "Produto cadastrado com sucesso",
            produto
        });

    } catch (error) {
        if (
            error.message === "Categoria não encontrada" ||
            error.message === "Marca não encontrada"
        ) {
            return res.status(404).json({
                mensagem: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao cadastrar produto"
        });
    }
}

export {
    listar,
    cadastrar
};