import prisma from "../prisma.js";

async function listarProdutos() {
    const produtos = await prisma.produto.findMany({
        where: {
            excluido_em: null
        },
        include: {
            categoria: true,
            marca: true,
            imagem_produto: true
        },
        orderBy: {
            criado_em: "desc"
        }
    });

    return produtos;
}

async function cadastrarProduto(dados) {
    const categoria = await prisma.categoria.findUnique({
        where: {
            id_categoria: dados.id_categoria
        }
    });

    if (!categoria) {
        throw new Error("Categoria não encontrada");
    }

    const marca = await prisma.marca.findUnique({
        where: {
            id_marca: dados.id_marca
        }
    });

    if (!marca) {
        throw new Error("Marca não encontrada");
    }

    const produto = await prisma.produto.create({
        data: {
            nome: dados.nome,
            descricao: dados.descricao,
            preco: dados.preco,
            especificacoes: dados.especificacoes,
            disponivel: dados.disponivel,
            categoria: {
                connect: {
                    id_categoria: dados.id_categoria
                }
            },
            marca: {
                connect: {
                    id_marca: dados.id_marca
                }
            }
        },
        include: {
            categoria: true,
            marca: true,
            imagem_produto: true
        }
    });

    return produto;
}

async function editarProduto(id_produto, dados) {
    const produtoExistente = await prisma.produto.findUnique({
        where: {
            id_produto
        }
    });

    // Produto excluído logicamente é tratado como inexistente na edição
    if (!produtoExistente || produtoExistente.excluido_em !== null) {
        throw new Error("Produto não encontrado");
    }

    if (dados.id_categoria !== undefined) {
        const categoria = await prisma.categoria.findUnique({
            where: {
                id_categoria: dados.id_categoria
            }
        });

        if (!categoria) {
            throw new Error("Categoria não encontrada");
        }
    }

    if (dados.id_marca !== undefined) {
        const marca = await prisma.marca.findUnique({
            where: {
                id_marca: dados.id_marca
            }
        });

        if (!marca) {
            throw new Error("Marca não encontrada");
        }
    }

    // Só altera os campos que foram enviados na requisição
    const dadosAtualizacao = {};

    if (dados.nome !== undefined) dadosAtualizacao.nome = dados.nome;
    if (dados.descricao !== undefined) dadosAtualizacao.descricao = dados.descricao;
    if (dados.preco !== undefined) dadosAtualizacao.preco = dados.preco;
    if (dados.especificacoes !== undefined) dadosAtualizacao.especificacoes = dados.especificacoes;
    if (dados.disponivel !== undefined) dadosAtualizacao.disponivel = dados.disponivel;

    if (dados.id_categoria !== undefined) {
        dadosAtualizacao.categoria = {
            connect: {
                id_categoria: dados.id_categoria
            }
        };
    }

    if (dados.id_marca !== undefined) {
        dadosAtualizacao.marca = {
            connect: {
                id_marca: dados.id_marca
            }
        };
    }

    const produto = await prisma.produto.update({
        where: {
            id_produto
        },
        data: dadosAtualizacao,
        include: {
            categoria: true,
            marca: true,
            imagem_produto: true
        }
    });

    return produto;
}

async function excluirProduto(id_produto) {
    const produto = await prisma.produto.findUnique({
        where: {
            id_produto
        }
    });

    if (!produto) {
        throw new Error("Produto não encontrado");
    }

    if (produto.excluido_em !== null) {
        throw new Error("Produto já foi excluído");
    }

    const excluido_em = new Date();

    // Soft delete: apenas registra a data de exclusão, sem executar DELETE.
    // O filtro "excluido_em: null" evita marcar duas vezes caso duas
    // requisições de exclusão cheguem ao mesmo tempo.
    const resultado = await prisma.produto.updateMany({
        where: {
            id_produto,
            excluido_em: null
        },
        data: {
            excluido_em
        }
    });

    if (resultado.count === 0) {
        throw new Error("Produto já foi excluído");
    }

    return {
        id_produto,
        nome: produto.nome,
        excluido_em
    };
}

export {
    listarProdutos,
    cadastrarProduto,
    editarProduto,
    excluirProduto
};