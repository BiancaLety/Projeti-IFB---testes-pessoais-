import express from "express";
import autenticar from "../middlewares/authMiddleware.js"
import { 
    listar, 
    cadastrar 
} from "../controllers/produtoController.js";

const router = express.Router();

router.get("/", listar);
router.post("/", autenticar,cadastrar);

export default router;