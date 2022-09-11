import express from "express";
import { getAllCategories, getCategoryByName, insertCategory } from "../controllers/category.controller.js";
import { checkCategoryAvaiable } from "../middlewares/index.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get('/', getAllCategories);

router.get('/:name', getCategoryByName);

router.post('/api/insert-category', jwtAuth.verifyToken, [checkCategoryAvaiable], insertCategory);

export default router;