import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import UserRouter from './controllers/user.js';
import NoteRouter from './controllers/note.js';
import db from './db/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Curb Cores Error by adding a header here
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     );
//     next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('This is the notes app created with MERN stack.')
});

app.use("/user", UserRouter);
app.use("/note", NoteRouter);

app.listen(PORT, () => {
    console.log(`Notes app running on port ${PORT}`);
})