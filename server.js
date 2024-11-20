import express from "express";

const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Um gato fofo",
        imagem: "https://placecats.com/200/300"
    },
    {
        id: 3,
        descricao: "Gato dormindo",
        imagem: "https://placecats.com/300/200"
    },
    {
        id: 4,
        descricao: "Gato brincando",
        imagem: "https://placekitten.com/200/300"
    },
    {
        id: 5,
        descricao: "Gato olhando para o nada",
        imagem: "https://placekitten.com/g/200/300"
    },
    {
        id: 6,
        descricao: "Gato comendo",
        imagem: "https://placekitten.com/200/200"
    },
    {
        id: 7,
        descricao: "Gato se espreguiçando",
        imagem: "https://placekitten.com/g/300/200"
    },
    {
        id: 8,
        descricao: "Gato curioso",
        imagem: "https://placebear.com/200/300"
    },
    {
        id: 9,
        descricao: "Gato majestoso",
        imagem: "https://placebear.com/300/200"
    },
    {
        id: 10,
        descricao: "Gato engraçado",
        imagem: "https://placedog.com/200/300"
    },
    {
        id: 11,
        descricao: "Gato aventureiro",
        imagem: "https://placebeard.it/200/300"
    }
];

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    const post = posts.find((post) => post.id == id);

    if (!post) {
        res.status(404).json({ erro: "Post não encontrado" });
        return;
    }

    res.status(200).json(post);
});
