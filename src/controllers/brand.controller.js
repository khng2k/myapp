import { Brand } from "../models/brand.model.js";

// get all Brands
export const getAllBrands = async (req, res) => {    
    try {
        res.status(200).json(await Brand.find({}));
    } catch (err) {
        res.status(500).send({ message: `Error while getting Brand`});
        return;
    }
};

// get Brand by brand name
export const getBrandByName = async (req, res) => {    
    try {
        res.status(200).json(await Brand.find({ name: req.params.name }));
    } catch (err) {
        res.status(500).send({ message: `Error while getting Brand`});
        return;
    }
};

// add new Brand
export const insertBrand = async (req, res) => {
    const brand = new Brand({
        name: req.body.name
    });

    try {
        res.status(200).json(await Brand.create(brand));
    } catch (err) {
        res.status(500).send({ message: `Error while creating Brand`});
        return;
    } 
}
