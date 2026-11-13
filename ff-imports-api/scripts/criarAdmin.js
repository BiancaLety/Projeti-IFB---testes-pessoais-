import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../src/prisma.js";

const email = "admin@ffimports.com";
const nome = "Administrador";
const senha = "123456";

async function criarAdministrador() {
    const senhaHash = await bcrypt.hash(senha, 10);

    const administrador = await prisma.administrador.create({
        data: {
            email,
            nome,
            senha: senhaHash
        }
    });

    console.log("Administrador criado com sucesso!");
    console.log({
        id_admin: administrador.id_admin,
        nome: administrador.nome,
        email: administrador.email
    });
}

criarAdministrador()
    .catch((error) => {
        console.error("Erro ao criar administrador:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });