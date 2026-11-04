import express from "express";
import authRoutes from "./routes/authRoutes.js";
import produtoRoutes from "./routes/produtoRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "API FF Imports funcionando!"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/produtos", produtoRoutes);

export default app;