import { dbConfig } from "./config/db.config.js";
import { User } from "./models/user.model.js";
import { Role } from "./models/role.model.js";
import { Category } from "./models/category.model.js";
import { Brand } from "./models/brand.model.js";
import { Product } from "./models/product.model.js";
import mongoose from "mongoose";
import pkg from 'sha2';
import { Cart } from "./models/cart.model.js";
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
async function initial() {
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
                name: "mod"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'mod' to roles collection");
            });

            new Roles({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'admin' to roles collection");
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
                roles: 'admin',
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
                roles: 'mod',
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'Admin 01' to roles collection");
            });

            new Users({
                name: 'Nguy???n V??n A',
                phone: '0984526381',
                username: 'vana',
                password: hash_pw,
                roles: 'guest',
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'Nguy???n V??n A' to roles collection");
            });

            new Users({
                name: 'Tr???n Th??? B',
                phone: '0385638344',
                username: 'thib',
                password: hash_pw,
                roles: 'guest',
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'Tr???n Th??? B' to roles collection");
            });
        }
    });

    Cart.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            User.find({}).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (user) {
                    for (const us of user) {
                        new Cart({
                            idUser: us._id,
                            shoppingCart: []
                        }).save(err => {
                            if (err) {
                                console.log("error", err);
                            }
                    
                            console.log(`added Shopping Cart of ${us.name} to Cart collection`);
                        });
                    }
                }
            });
        }
    });

    Category.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Category({
                name: "M??y gi???t"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'M??y gi???t' to categories collection");
            });
    
            new Category({
                name: "T??? l???nh"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'T??? l???nh' to categories collection");
            });
        }
    });

    Brand.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Brand({
                name: "Toshiba"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'Toshiba' to brands collection");
            });
    
            new Brand({
                name: "Samsung"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'Samsung' to brands collection");
            });
        }
    });

    Product.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Product({
                name: "M??y gi???t Toshiba Inverter 8.5 Kg TW-BH95S2V WK",
                qty: 3,
                category: "M??y gi???t",
                brand: "Toshiba",
                price: 7320000
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'M??y gi???t Toshiba Inverter 8.5 Kg TW-BH95S2V WK' to products collection");
            });
    
            new Product({
                name: "T??? l???nh Samsung Inverter 655 l??t RS62R5001M9/SV",
                qty: 5,
                category: "T??? l???nh",
                brand: "Samsung",
                price: 20490000
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
        
                console.log("added 'T??? l???nh Samsung Inverter 655 l??t RS62R5001M9/SV' to products collection");
            });
        }
    });

}

export { db };