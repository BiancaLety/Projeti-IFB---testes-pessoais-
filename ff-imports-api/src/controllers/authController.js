import { login as realizarLogin } from "../services/authServices.js";

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "E-mail e senha são obrigatórios"
            });
        }

        const resultado = await realizarLogin(email, senha);

        return res.status(200).json(resultado);

    } catch (error) {
        if (error.message === "E-mail ou senha inválidos") {
            return res.status(401).json({
                mensagem: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        });
    }
}

export {
    login
};