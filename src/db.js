import { dbConfig } from "./config/db.config.js";
import { User } from "./models/user.model.js";
import { Role } from "./models/role.model.js";
import mongoose from "mongoose";
import pkg from 'sha2';
const { sha256 } = pkg;


class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        const dbConn = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

        mongoose
            .connect(dbConn, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log("Successfully connect to MongoDB.");
                initial();
            })
            .catch(err => {
                console.error("Connection error", err);
                process.exit();
            });
    }
}


const db = new Database();
db.user = User;
db.role = Role;
db.mongoose = mongoose;

const Roles = db.role;
const Users = db.user;

//Initial Run to Create Roles
function initial() {
    Roles.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Roles({
                name: "guest"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'guest' to roles collection");
            });
    
            new Roles({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'admin' to roles collection");
            });

            new Roles({
                name: "owner"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'owner' to roles collection");
            });
        }
    });

    Users.estimatedDocumentCount((err, count) => {
        const hash_pw = sha256('123456').toString();

        if (!err && count === 0) {
            new Users({
                name: 'NP',
                phone: '0123456789',
                username: 'np',
                password: hash_pw,
                roles: 'owner'
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'NP' to roles collection");
            });
    
            new Users({
                name: 'Admin 01',
                phone: '0987654321',
                username: 'admin01',
                password: hash_pw,
                roles: 'admin'
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'Admin 01' to roles collection");
            });

            new Users({
                name: 'Nguyễn Văn A',
                phone: '0984526381',
                username: 'vana',
                password: hash_pw,
                roles: 'guest'
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'Nguyễn Văn A' to roles collection");
            });

            new Users({
                name: 'Trần Thị B',
                phone: '0385638344',
                username: 'thib',
                password: hash_pw,
                roles: 'guest'
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'Trần Thị B' to roles collection");
            });
        }
    });
}

export { db };