import express from "express";
import { listarPosts, listarPostsPorId } from "../controllers/postsController.js";

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listarPosts);
    
    app.get("/posts/:id", listarPostsPorId);
}

export default routes;