import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes");
    const posts = db.collection("posts");
    return await posts.find().toArray();
}

export async function getPostPorId(id) {
    const db = conexao.db("imersao-instabytes");
    const posts = db.collection("posts");
    return await posts.findOne({ _id: id });
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const posts = db.collection("posts");
    return await posts.insertOne(novoPost);
}

export async function atualizarPost(id, post) {
    const db = conexao.db("imersao-instabytes");
    const posts = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);

    return await posts.updateOne({_id: objID}, { $set: post });
}