import express from "express";
import multer from "multer";
import cors from "cors";

import { listarPosts, listarPostsPorId, postarNovoPost, uploadImagem, atualizarPostExistente } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

// Configuração do multer para salvar imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {
    // Permite responder solicitações com corpo do texto em JSON.
    app.use(express.json());
    app.use(cors(corsOptions));

    // Rotas para busca dos posts
    app.get("/posts", listarPosts);
    app.get("/posts/:id", listarPostsPorId);
    // Rota criar postos
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarPostExistente);
}

export default routes;