import getTodosPosts from "../models/postsModel.js";

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