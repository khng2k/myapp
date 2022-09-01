import express from "express";
import bodyParser from 'body-parser';
import { db } from './db.js';
import userRoutes from './routes/users.route.js';
import { Server } from "socket.io";
import http from 'http';
import session from 'express-session';

const app = express();
const PORT = 12345;
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());

app.use('/user', userRoutes);

db;

app.get('/', (req, res) => {
    res.send("<h1>HOME PAGE</h1>")
});

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
})