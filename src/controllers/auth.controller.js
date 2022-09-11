import { User } from '../models/user.model.js';
import { Cart } from '../models/cart.model.js';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import pkg from 'sha2';
const { sha256 } = pkg;

dotenv.config()


// create Shopping Cart
const createCart = id => {
    const cart = new Cart({
        idUser: id,
        shoppingCart: []
    })
    cart.save((err) => {
        return (req, res) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({
                code : 0,
                message: `Create Shopping Cart of ${id}`
            })
        }
    })
}

// sign up
export const signUp = (req, res) => {
    const newNser = new User({
        name: req.body.name,
        phone: req.body.phone,
        username: req.body.username,
        password: sha256(req.body.password).toString(),
        roles: req.body.roles
    });
    
    newNser.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({
            code : 0,
            message: "Đăng ký thành công"
        })
        createCart(user._id);
    })
}

// sign in
export const signIn = (req,res) => {
    User.findOne({ username: req.body.username }).exec((err,user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!user) {
            res.status(404).send({message: "Tài khoản không tồn tại"});
            return;
        }

        if(sha256(req.body.password).toString() != user.password) {
            return res.status(401).send({
                message: "Sai mật khẩu!"
            })
        }

        const token = jwt.sign({id: user.id}, process.env.SECRET_ACCESS_TOKEN, {
            expiresIn: 30000
        })
        res.status(200).send({
            id: user._id,
            name: user.name,
            roles: user.roles,
            accessToken: token
        });  
    })
}