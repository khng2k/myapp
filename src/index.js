import express from "express";
import bodyParser from 'body-parser';
import userRoutes from './routes/users.route.js';
import productRoutes from './routes/products.route.js';
import brandRoutes from './routes/brands.route.js';
import categoryRoutes from './routes/categories.route.js';
import { signIn, signUp } from "./controllers/auth.controller.js";
import { verifySignUp, verifySignIn } from "./middlewares/checkAuth.js";
import { jwtAuth } from "./middlewares/jwtAuth.js";
import { db } from './db.js';

const app = express();

db;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>HOME PAGE</h1>")
});
app.use('/user', jwtAuth.verifyToken, userRoutes);
app.use('/product', productRoutes);
app.use('/brand', brandRoutes);
app.use('/category', categoryRoutes);
// sign in
app.post(
    "/api/signin",
    [
        verifySignIn.checkInputSignIn
    ],
    signIn
);
// sign up
app.post(
    "/api/signup",
    [
        verifySignUp.checkInputSignUp,
        verifySignUp.checkUserAvaiable
    ],
    signUp
);

export {app};