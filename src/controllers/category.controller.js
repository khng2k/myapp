import { Category } from "../models/category.model.js";

// get all Categories
export const getAllCategories = async (req, res) => {    
    try {
        res.status(200).json(await Category.find({}));
    } catch (err) {
        res.status(500).send({ message: `Error while getting Category`});
        return;
    }
};

// get Category by category name
export const getCategoryByName = async (req, res) => {    
    try {
        res.status(200).json(await Category.find({ name: req.params.name }));
    } catch (err) {
        res.status(500).send({ message: `Error while getting Category`});
        return;
    }
};

// add new Category
export const insertCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name
    });

    try {
        res.status(200).json(await Category.create(category));
    } catch (err) {
        res.status(500).send({ message: `Error while creating Category`});
        return;
    }
}