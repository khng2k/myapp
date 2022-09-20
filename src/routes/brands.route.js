import express from "express";
import { getAllBrands, getBrandByName, insertBrand } from "../controllers/brand.controller.js";
import { checkBrandAvaiable } from "../middlewares/index.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get('/', getAllBrands);

router.get('/:name', getBrandByName);

router.post('/api/insert-brand', [jwtAuth.verifyToken, jwtAuth.authPage(['mod', 'admin'])], [checkBrandAvaiable], insertBrand);

export default router;