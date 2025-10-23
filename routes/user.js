import express from "express";
const router = express.Router();
import {getUsers,defaultRoute } from "../controllers/userController.js";

router.get("/allAppUsers",getUsers );
router.get("/",defaultRoute );

export default router;
