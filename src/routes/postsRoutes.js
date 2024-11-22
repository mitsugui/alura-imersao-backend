import express from "express";
import multer from "multer";

import { listarPosts, listarPostsPorId, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

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
    // Rotas para busca dos posts
    app.get("/posts", listarPosts);
    app.get("/posts/:id", listarPostsPorId);
    // Rota criar postos
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
}

export default routes;