import { mongoose } from 'mongoose';

export const Brand = mongoose.model(
    "Brand",
    new mongoose.Schema({
        name: { type: String }
    })
)