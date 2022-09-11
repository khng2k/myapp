import { Brand } from "../models/brand.model.js";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { Cart } from "../models/cart.model.js";


// check Brand avaiable when creating new Brand
export const checkBrandAvaiable = (req, res, next) => {
    if (req.body.name) {
        Brand.findOne({ name: req.body.name }).exec((err, brand) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (brand) {
                res.status(400).send({ message: `Tồn tại brand ${req.body.name} trong dữ liệu` });
                return;
            }
            next();
        })
    }
    else {
        return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
    }
}


// check Product quantity when adding Shopping Cart
const checkQtyProductToCart = (req, res, next) => {
    const newProductInCart = req.body;
    Product.findOne({ _id: newProductInCart.idProduct}).exec((err, product) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (product) {
            if (product.qty < newProductInCart.qty) {
                res.status(400).send({ message: "Không đủ sản phẩm trong kho" });
                return;
            }
            next();
        }
    })
}

// check Product avaiable in Shopping Cart when adding Shopping Cart
const checkProductAvaiableInCart = (req, res, next) => {
    const newProductInCart = req.body;
    Cart.findOne({ idUser: req.params.id }).exec((err, cart) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (cart) {
            const products = cart.shoppingCart;
            for (let product of products) {
                if (newProductInCart.idProduct == product.idProduct) {
                    res.status(400).send({ message: "Sản phẩm đã có trong Shopping Cart" });
                    return;
                }
            }
        }
        next();
    })
}

export const checkShoppingCart = {
    checkQtyProductToCart,
    checkProductAvaiableInCart
}


// check Product avaiable when creating new Product
const checkProductAvaiable = (req, res, next) => {
    Product.findOne({ name: req.body.name}).exec((err, product) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (product) {
            res.status(400).send({ message: "sản phẩm đã có trong dữ liệu." });
            return;
        }
        next();
    })
}

// check Brand avaiable when creating new Product
const checkBrandAvaiableInProduct = (req, res, next) => {
    if (req.body.brand) {
        Brand.findOne({ name: req.body.brand }).exec((err, brand) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!brand) {
                res.status(400).send({ message: `Không tồn tại brand ${req.body.brand} trong dữ liệu` });
                return;
            }
            next();
        })
    }
}

// check Category avaiable when creating new Product
const checkCategoryAvaiableInProduct = (req, res, next) => {
    if (req.body.category) {
        Category.findOne({ name: req.body.category }).exec((err, category) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!category) {
                res.status(400).send({ message: `Không tồn tại category ${req.body.category} trong dữ liệu` });
                return;
            }
            next();
        })
    }
}

// check null when creating new Product
const checkInputProduct = (req, res, next) => {
    if (req.body.name == "" || req.body.category == "" || req.body.brand == "" || req.body.qty == null || req.body.price == null) {
        return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
    }
    next();
}

export const checkProduct = {
    checkInputProduct,
    checkProductAvaiable,
    checkBrandAvaiableInProduct,
    checkCategoryAvaiableInProduct
};


// check Category avaiable when creating new Category
export const checkCategoryAvaiable = (req, res, next) => {
    if (req.body.name) {
        Category.findOne({ name: req.body.name }).exec((err, category) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (category) {
                res.status(400).send({ message: `Tồn tại category ${req.body.name} trong dữ liệu` });
                return;
            }
            next();
        })
    }
    else {
        return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
    }
}