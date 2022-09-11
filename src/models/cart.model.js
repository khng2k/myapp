import { mongoose } from 'mongoose';

export const Cart = mongoose.model(
    "Cart",
    new mongoose.Schema({
        idUser: {type: mongoose.Schema.Types.String, ref: "User"},
        shoppingCart: 
        [{
            name: {type: mongoose.Schema.Types.String, ref: "Product"},
            idProduct: {type: mongoose.Schema.Types.String, ref: "Product"},
            price: {type: mongoose.Schema.Types.Number, ref: "Product"},
            qty: {type: Number},
            date: {type: Date}
        }]
    })
)