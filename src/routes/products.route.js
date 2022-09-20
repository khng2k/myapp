import express from "express";
import { productController } from "../controllers/product.controller.js";
import { insertProduct } from "../controllers/product.controller.js";
import { checkProduct } from "../middlewares/index.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post(
    '/api/insert-product',
    [
        jwtAuth.verifyToken, 
        jwtAuth.authPage(['mod', 'admin'])
    ], 
    [
        checkProduct.checkInputProduct, 
        checkProduct.checkBrandAvaiableInProduct, 
        checkProduct.checkProductAvaiable, 
        checkProduct.checkCategoryAvaiableInProduct
    ],
    insertProduct
);

export default router;