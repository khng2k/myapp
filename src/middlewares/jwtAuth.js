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

const authPage = listRoleAccess => {
    return (req,res,next) => {
        User.findById(req.userId).exec((err,user)=>{
            if(err){
                res.status(500).send({message: err});
                return;
            }
    
            if (!user) {
                res.status(500).send({message: "lỗi Server"});
            }
    
            if(!listRoleAccess.includes(user.roles)){
                return res.status(401).send({message: "Không có quyền truy cập"});
            }
    
            next();
        })
    }
}

const authInfoUser = (req, res, next) => {
    if (req.userId != req.params.id) {
        return res.status(401).send({message: "Không có quyền truy cập"});
    } 
    next();    
}

export const jwtAuth = {
    verifyToken,
    authInfoUser,
    authPage
};