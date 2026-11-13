import express from "express";
import autenticar from "../middlewares/authMiddleware.js"
import { 
    listar,
    cadastrar,
    editar,
    excluir
} from "../controllers/produtoController.js";

const router = express.Router();

router.get("/", listar);
router.post("/", autenticar,cadastrar);
router.put("/:id", autenticar, editar);
router.delete("/:id", autenticar, excluir);

export default router;