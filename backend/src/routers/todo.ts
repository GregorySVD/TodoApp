import {Router} from "express";

export const todoRouter = Router ();


todoRouter
    .get('/', async (req, res) => {
        res.json({name: 'Jazda'});
    })
