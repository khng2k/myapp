import { User } from '../models/user.model.js';
import { Role } from '../models/role.model.js';
import { config } from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import pkg from 'sha2';
const { sha256 } = pkg;

export const signUp = (req, res) => {
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        username: req.body.username,
        password: sha256(req.body.password).toString(),
        roles: req.body.roles
    });
    
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles }
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                // user.roles = roles.map(role => role._id);
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({
                        code : 0,
                        message: "Đăng ký thành công"
                    })
                })
            })
        } else {
            res.send({message: "Chưa thêm quyền"});
            return;
        }
    })
}

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

        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 43200
        })
        res.status(200).send({
            id: user._id,
            name: user.name,
            roles: user.roles,
            accessToken: token
        });  
    })
}