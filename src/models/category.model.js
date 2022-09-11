import { mongoose } from 'mongoose';

export const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        name: { type: String }
    })
)