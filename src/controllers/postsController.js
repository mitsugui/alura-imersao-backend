import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";

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
        imgUrl: req.file.originalname,
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

export async function atualizarPostExistente(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const postAtualizar =  {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };

        const postAtualizado = await atualizarPost(id, postAtualizar);
        res.status(200).json(postAtualizado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({ Erro: "Erro ao atualizar post" });
    }
}