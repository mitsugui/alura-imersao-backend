import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export default async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes");
    const posts = db.collection("posts");
    return await posts.find().toArray();
}