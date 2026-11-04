import jwt from "jsonwebtoken";

function autenticar(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                mensagem: "Token não informado"
            });
        }

        const partes = authorization.split(" ");

        if (partes.length !== 2 || partes[0] !== "Bearer") {
            return res.status(401).json({
                mensagem: "Formato de token inválido"
            });
        }

        const token = partes[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.administrador = payload;

        next();

    } catch (error) {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado"
        });
    }
}

export default autenticar;