import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";


// verify Access Token
const verifyToken = (req,res,next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).send({message: "You need sign in"});
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(403).send({message: "Không có token"});
    }

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err,decoded) => {
        if (err) {
            return res.status(401).send({message: "Không có quyền truy cập"});
        }
        req.userId = decoded.id;
        next();
    })
}

const isOwner = (req,res,next) => {
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

const isAdmin = (req,res,next) => {
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