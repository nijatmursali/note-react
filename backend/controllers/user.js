import dotenv from 'dotenv';
import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
dotenv.config();

const { SECRET = "secret" } = process.env;
const { JWT_EXPIRES_IN = "1 day" } = process.env;

router.post("/signup", async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        console.log(user);
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: JWT_EXPIRES_IN });
                res.status(200).json({ token });
            } else {
                res.status(400).json({ error: "Password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

const verify = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

router.post("/profile", verify, async (req, res) => {
    try {
        jwt.verify(req.token, SECRET, async (err, auth) => {
            if (err) {
                res.status(400).json({ error: "Invalid token" });
            } else {
                const user = await User.findOne({ username: auth.username });
                res.status(200).json({
                    message: `Welcome ${auth.username}!`,
                    user: user
                });
            }
        });
    } catch (error) {
        res.status(400).json({ error });
    }
});



export default router;