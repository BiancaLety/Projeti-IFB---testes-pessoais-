import prisma from "../prisma.js";

async function listarProdutos() {
    const produtos = await prisma.produto.findMany({
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

export {
    listarProdutos,
    cadastrarProduto
};