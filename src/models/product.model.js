import { mongoose } from 'mongoose';

export const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name: { type: String },
        qty: { type: Number },
        category: {type: mongoose.Schema.Types.String, ref: "Type"},
        brand: {type: mongoose.Schema.Types.String, ref: "Brand"},
        price: { type: Number }
    })
)