import {
    listarProdutos as buscarProdutos,
    cadastrarProduto as criarProduto,
    editarProduto as atualizarProduto,
    excluirProduto as removerProduto
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

async function editar(req, res) {
    try {
        const id_produto = Number(req.params.id);

        if (!Number.isInteger(id_produto) || id_produto <= 0) {
            return res.status(400).json({
                mensagem: "ID do produto inválido"
            });
        }

        const {
            nome,
            descricao,
            preco,
            especificacoes,
            disponivel,
            id_categoria,
            id_marca
        } = req.body ?? {};

        if (
            nome === undefined &&
            descricao === undefined &&
            preco === undefined &&
            especificacoes === undefined &&
            disponivel === undefined &&
            id_categoria === undefined &&
            id_marca === undefined
        ) {
            return res.status(400).json({
                mensagem: "Informe ao menos um campo para atualizar"
            });
        }

        const erros = [];

        if (
            nome !== undefined &&
            (typeof nome !== "string" || nome.trim() === "" || nome.trim().length > 150)
        ) {
            erros.push("O campo nome deve ser um texto não vazio de até 150 caracteres");
        }

        if (
            descricao !== undefined &&
            descricao !== null &&
            typeof descricao !== "string"
        ) {
            erros.push("O campo descricao deve ser um texto");
        }

        if (
            preco !== undefined &&
            (typeof preco !== "number" || !Number.isFinite(preco) || preco < 0 || preco > 99999999.99)
        ) {
            erros.push("O campo preco deve ser um número não negativo");
        }

        if (
            especificacoes !== undefined &&
            especificacoes !== null &&
            typeof especificacoes !== "string"
        ) {
            erros.push("O campo especificacoes deve ser um texto");
        }

        if (
            disponivel !== undefined &&
            typeof disponivel !== "boolean"
        ) {
            erros.push("O campo disponivel deve ser booleano");
        }

        if (
            id_categoria !== undefined &&
            (!Number.isInteger(id_categoria) || id_categoria <= 0)
        ) {
            erros.push("O campo id_categoria deve ser um inteiro positivo");
        }

        if (
            id_marca !== undefined &&
            (!Number.isInteger(id_marca) || id_marca <= 0)
        ) {
            erros.push("O campo id_marca deve ser um inteiro positivo");
        }

        if (erros.length > 0) {
            return res.status(400).json({
                mensagem: "Dados do produto inválidos",
                erros
            });
        }

        const produto = await atualizarProduto(id_produto, {
            nome: nome !== undefined ? nome.trim() : undefined,
            descricao,
            preco,
            especificacoes,
            disponivel,
            id_categoria,
            id_marca
        });

        return res.status(200).json({
            mensagem: "Produto atualizado com sucesso",
            produto
        });

    } catch (error) {
        if (error.message === "Produto não encontrado") {
            return res.status(404).json({
                mensagem: error.message
            });
        }

        if (
            error.message === "Categoria não encontrada" ||
            error.message === "Marca não encontrada"
        ) {
            return res.status(400).json({
                mensagem: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao atualizar produto"
        });
    }
}

async function excluir(req, res) {
    try {
        const id_produto = Number(req.params.id);

        if (!Number.isInteger(id_produto) || id_produto <= 0) {
            return res.status(400).json({
                mensagem: "ID do produto inválido"
            });
        }

        const produto = await removerProduto(id_produto);

        return res.status(200).json({
            mensagem: "Produto excluído com sucesso",
            produto
        });

    } catch (error) {
        if (error.message === "Produto não encontrado") {
            return res.status(404).json({
                mensagem: error.message
            });
        }

        if (error.message === "Produto já foi excluído") {
            return res.status(409).json({
                mensagem: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao excluir produto"
        });
    }
}

export {
    listar,
    cadastrar,
    editar,
    excluir
};