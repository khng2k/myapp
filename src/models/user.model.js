import { mongoose } from 'mongoose';

export const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: { type: String },
        phone: { type: String },
        username: { type: String },
        password: { type: String },
        roles: {type: mongoose.Schema.Types.String, ref: "Role"}
    })
)