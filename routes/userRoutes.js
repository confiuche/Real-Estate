import express from "express";
import { 
    createUserCtr, 
    displayAllController, 
    profile, 
    userLoginCtrl 
} from "../controller/userController.js";
import { isLogin } from "../middlewear/isLogin.js";

const userRoute = express.Router();

//create user
userRoute.post("/create", createUserCtr);
//login
userRoute.post("/login", userLoginCtrl);
//profile
userRoute.get("/profile", isLogin, profile)
//userRoute.get("/:id",isLogin , profile)
//get users
userRoute.get("",isLogin,displayAllController);

export default userRoute;
