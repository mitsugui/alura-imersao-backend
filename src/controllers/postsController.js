import fs from "fs";
import { getTodosPosts, criarPost } from "../models/postsModel.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function listarPostsPorId(req, res) {
    const id = req.params.id;
    const posts = await getTodosPosts();
    const post = posts.find((post) => post._id == id);

    if (!post) {
        res.status(404).json({ erro: "Post não encontrado" });
        return;
    }

    res.status(200).json(post);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({ Erro: "Erro ao criar novo post" });
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        urlImagem: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAlterada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAlterada);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({ Erro: "Erro ao criar novo post" });
    }
}