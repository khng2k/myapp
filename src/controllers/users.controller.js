import { User } from '../models/user.model.js';
import { Cart } from '../models/cart.model.js';


// get all Users 
export const getAllUsers = async (req, res) => {    
    try {
        res.status(200).json(await User.find({}));
    } catch (err) {
        res.status(500).send({ message: `Error while getting User`});
        return;
    }
};

// get User by ID
export const getUserById = async (req, res) => {    
    try {
        res.status(200).json(await User.find({ _id: req.params.id }));
    } catch (err) {
        res.status(500).send({ message: `Error while getting User`});
        return;
    }
};


// get Products in Shopping Cart by ID user
const getProductsInCart = async (req, res) => {
    try {
        await Cart.findOne({ idUser: req.params.id }).exec((err, cart) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (cart) {
                // const carts = cart.shoppingCart;
                res.status(200).json(cart);
            }
        })
    } catch (err) {
        res.status(500).send({ message: `Error while getting Shopping Cart`});
        return;
    }
}

// add Product to Shopping Cart
const addProductToCart = async (req, res) => {
    
    const product = {
        name: req.body.name,
        idProduct: req.body.idProduct,
        price: req.body.price,
        qty: req.body.qty,
        date: new Date().toLocaleString('en-US')
    };

    try {
        await Cart.updateOne(
            { idUser: req.params.id },
            { $push: { shoppingCart: product } }
        );
        res.status(200).json(`Thêm ${product.qty} sản phẩm ${product.name} vào Shopping Cart of ${req.params.id}`);
    } catch (err) {
        res.status(500).send({ message: `Error while adding ${product.name} to Shopping Cart ${err}`});
        return;
    }
};

// change Product quantity (qty) in Shopping Cart
const updateProductInCart = async (req, res) => {
    const product = {
        name: req.body.name,
        idProduct: req.body.idProduct,
        price: req.body.price,
        qty: req.body.qty
    };

    try {
        await Cart.updateOne(
            { "shoppingCart.idProduct": product.idProduct },
            { $set: { "shoppingCart.$[].qty": product.qty } }
        )
        res.status(200).json(`Thay đổi số lượng sản phẩm ${product.name} trong Shopping Cart`);
    } catch (err) {
        console.error(`Error while deleting ${product.name} from Shopping Cart`);
        next(err);
    }

};

// remove Product in Shopping Cart
const removeProductInCart = async (req, res) => {
    const product = {
        name: req.body.name,
        idProduct: req.body.idProduct
    };

    try {
        await Cart.update({ $pull: { shoppingCart: { idProduct: product.idProduct } } });
        res.status(200).json(`Xóa sản phẩm ${product.name} ra khỏi Shopping Cart`);
    } catch (err) {
        console.error(`Error while deleting ${product.name} from Shopping Cart`, err.message);
        next(err);
    }
};

export const shoppingCart = {
    getProductsInCart,
    addProductToCart,
    updateProductInCart,
    removeProductInCart
}