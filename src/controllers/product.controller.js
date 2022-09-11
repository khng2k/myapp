import { Product } from '../models/product.model.js';
import { Brand } from '../models/brand.model.js';

// get all Products
const getAllProducts = async (req, res) => {    
    try {
        res.status(200).json(await Product.find({}));
    } catch (err) {
        res.status(500).send({ message: `Error while getting Product`});
        return;
    }
};

// get Product by product id
const getProductById = async (req, res) => {    
    try {
        res.status(200).json(await Product.find({ _id: req.params.id }));
    } catch (err) {
        res.status(500).send({ message: `Error while getting Product`});
        return;
    }
};

// add new Product
export const insertProduct = (req, res) => {
    
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        brand: req.body.brand,
        qty: req.body.qty
    });

    product.save((err, product) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.brand) {
            Brand.find({
                name: { $in: req.body.brand }
            }, (err, brand) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                product.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({
                        code : 0,
                        message: `Thêm ${req.body.name} thành công`
                    })
                })
            })
        } else {
            res.send({message: "Chưa thêm Brand"});
            return;
        }
    })
}

export const productController = {
    getAllProducts,
    getProductById
};