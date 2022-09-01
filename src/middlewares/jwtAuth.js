import jwt from "jsonwebtoken";
import { config } from "../config/auth.config.js";
import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";

verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({message: "Không có token"});
    }

    jwt.verify(token, config.secret, (err,decoded) => {
        if (err) {
            return res.status(401).send({message: "Không có quyền truy cập"});
        }
        req.userId = decoded.id;
        next();
    })
}

isOwner = (req,res,next) => {
    User.findById(req.id).exec((err,user)=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }

        Role.find({_id: {$in: user.roles} }, (err,roles) => {
            if(err) {
                res.status(500).send({message: err});
                return
            }

            if(roles.name === "owner"){
                next();
                return;
            }

            res.status(403).send({message: "Cần Quyền Owner"});
            return;
        })
    })
}

isAdmin = (req,res,next) => {
    User.findById(req.id).exec((err,user)=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }

        Role.find({_id: {$in: user.roles} }, (err,roles) => {
            if(err) {
                res.status(500).send({message: err});
                return
            }

            if(roles.name === "admin"){
                next();
                return;
            }

            res.status(403).send({message: "Cần Quyền Admin"});
            return;
        })
    })
}

export const jwtAuth = {
    verifyToken,
    isOwner,
    isAdmin
};