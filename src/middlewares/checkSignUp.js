import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";

const checkAvaiable = (req, res, next) => {
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

const checkRoleAvaiable = (req, res, next) => {
    if (req.body.roles) {
        Role.findOne({ name: req.body.roles }).exec((err, role) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!role) {
                res.status(400).send({ message: `Không tồn tại quyền ${req.body.roles} trong dữ liệu` });
                return;
            }
            next();
        })
    }
}

export const verifySignUp = {
    checkAvaiable,
    checkRoleAvaiable
};