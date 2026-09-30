import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

async function login(email, senha) {
    const administrador = await prisma.administrador.findUnique({
        where: {
            email: email
        }
    });

    if (!administrador) {
        throw new Error("E-mail ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(
        senha,
        administrador.senha
    );

    if (!senhaValida) {
        throw new Error("E-mail ou senha inválidos");
    }

    const token = jwt.sign(
        {
            id_admin: administrador.id_admin,
            email: administrador.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "8h"
        }
    );

    return {
        token,
        administrador: {
            id_admin: administrador.id_admin,
            nome: administrador.nome,
            email: administrador.email
        }
    };
}

export {
    login
};