import express from "express";
import { getAllUsers, getUserById, shoppingCart } from "../controllers/users.controller.js";
import { checkShoppingCart } from "../middlewares/index.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get('/', [jwtAuth.verifyToken, jwtAuth.authPage(['mod', 'admin'])], getAllUsers);

router.get('/:id', [jwtAuth.verifyToken, jwtAuth.authInfoUser], getUserById);

router.get('/:id/api/shopping-cart', [jwtAuth.verifyToken, jwtAuth.authInfoUser], shoppingCart.getProductsInCart);

router.post(
    '/:id/api/shopping-cart', [jwtAuth.verifyToken, jwtAuth.authInfoUser],
    [
        checkShoppingCart.checkProductAvaiableInCart, 
        checkShoppingCart.checkQtyProductToCart
    ], 
    shoppingCart.addProductToCart
);

router.patch('/:id/api/shopping-cart', [jwtAuth.verifyToken, jwtAuth.authInfoUser], checkShoppingCart.checkQtyProductToCart, shoppingCart.updateProductInCart);

router.delete('/:id/api/shopping-cart', [jwtAuth.verifyToken, jwtAuth.authInfoUser], shoppingCart.removeProductInCart);

export default router;