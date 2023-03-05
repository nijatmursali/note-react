import { Router } from "express";
import Note from "../models/note.js";
import isLoggedIn from "./middleware.js";

const router = Router();

router.get("/", isLoggedIn, async (req, res) => {
    const { username } = req.user;
    res.json(
        await Note.find({ username }).catch((error) =>
            res.status(400).json({ error })
        )
    );
});

router.get("/:id", isLoggedIn, async (req, res) => {
    const { username } = req.user;
    const _id = req.params.id;
    res.json(
        await Note.findOne({ username, _id }).catch((error) =>
            res.status(400).json({ error })
        )
    );
});

router.post("/", isLoggedIn, async (req, res) => {
    const { username } = req.user;
    req.body.username = username;
    res.json(
        await Note.create(req.body).catch((error) =>
            res.status(400).json({ error })
        )
    );
});

router.put("/:id", isLoggedIn, async (req, res) => {
    const { username } = req.user;
    req.body.username = username;
    const _id = req.params.id;
    res.json(
        await Note.updateOne({ username, _id }, req.body, { new: true }).catch(
            (error) => res.status(400).json({ error })
        )
    );
});

router.delete("/:id", isLoggedIn, async (req, res) => {
    const { username } = req.user;
    const _id = req.params.id;
    res.json(
        await Note.deleteOne({ username, _id }).catch((error) =>
            res.status(400).json({ error })
        )
    );
});

export default router;