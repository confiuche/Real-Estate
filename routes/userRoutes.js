import express from "express";
import { 
    createUserCtr, 
    userLoginCtrl 
} from "../controller/userController.js";

const userRoute = express.Router();

//create user
userRoute.post("/create", createUserCtr);
userRoute.post("/login", userLoginCtrl)

export default userRoute;
