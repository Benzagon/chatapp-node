import { Router } from "express";
import { users, testApi, login, signup, deleteUser } from "../controllers/user.controllers.js";
const router = Router();


router.get("/", testApi);

router.get("/users", users);

router.post("/signup", signup);

router.post("/login", login);

router.delete("/delete/:id", deleteUser);

export default router;