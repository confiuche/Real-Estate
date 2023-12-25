import express from "express";
import { createUserCtr } from "../controller/userController.js";

const userRoute = express.Router();

//create user
userRoute.post("/create", createUserCtr);

export default userRoute;
