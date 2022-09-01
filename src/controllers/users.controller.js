import { User } from '../models/user.model.js';

export const getAllUsers = async (req, res) => {    
    try {
        res.status(200).json(await User.find({}));
    } catch (err) {
        res.status(500).send({ message: `Error while getting User`});
        return;
    }
};

export const getUserById = async (req, res) => {    
    try {
        res.status(200).json(await User.find({ _id: req.params.id }));
    } catch (err) {
        res.status(500).send({ message: `Error while getting User`});
        return;
    }
};
