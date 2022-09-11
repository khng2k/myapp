import express from "express";
import { getAllUsers, getUserById, shoppingCart } from "../controllers/users.controller.js";
import { checkShoppingCart } from "../middlewares/index.js";

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.get('/:id/api/shopping-cart', shoppingCart.getProductsInCart);

router.post(
    '/:id/api/shopping-cart', 
    [
        checkShoppingCart.checkProductAvaiableInCart, 
        checkShoppingCart.checkQtyProductToCart
    ], 
    shoppingCart.addProductToCart
);

router.patch('/:id/api/shopping-cart', checkShoppingCart.checkQtyProductToCart, shoppingCart.updateProductInCart);

router.delete('/:id/api/shopping-cart', shoppingCart.removeProductInCart);

export default router;