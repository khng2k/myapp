import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { verifySignUp } from "../middlewares/checkSignUp.js";
import { getAllUsers, getUserById, getAllRoles } from "../controllers/users.controller.js";

const router = express.Router();

router.get('/', getAllUsers);

router.get('/roles', getAllRoles);

router.get('/:id', getUserById);

router.post("/api/signin", signIn);

router.post(
    "/api/signup",
    [
        verifySignUp.checkAvaiable,
        verifySignUp.checkRoleAvaiable
    ],
    signUp
);

export default router;