import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";

// check User avaiable when Sign up
const checkUserAvaiable = (req, res, next) => {
    User.findOne({ username: req.body.username}).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Tên đăng nhập đã được sử dụng." });
            return;
        }

        User.findOne({ phone: req.body.phone}).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: "SĐT đã được sử dụng." });
                return;
            }
            next();
        })
    })
}

// check null avaiable when Sign up
const checkInputSignUp = (req, res, next) => {
    if (req.body.name == "" || req.body.phone == "" || req.body.username == "" || req.body.password == "" || req.body.roles == "") {
        return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
    }
    next();
}

// check null avaiable when Sign in
const checkInputSignIn = (req, res, next) => {
    if (req.body.username == "" || req.body.password == "") {
        return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
    }
    next();
}

export const verifySignUp = {
    checkInputSignUp,
    checkUserAvaiable
};

export const verifySignIn = {
    checkInputSignIn
};