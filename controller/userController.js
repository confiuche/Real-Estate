import User from "../model/userModel.js";
import AppError from "../utils/AppErr.js";
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js";
import { obtainTokenFromHeader } from "../utils/obtainTokenFromHeader.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

//create account
// export const createUserCtr = async(req,res) => {
//     const {firstname, lastname, email, password} = req.body
//     try {
//         res.json({
//         status:"success",
//         data:"user created successfully"
//     })
//     } catch (error) {
//         res.json(error.message);
//     }
// }


export const createUserCtr = async(req,res,next) => {
const {firstname, lastname, email, password} = req.body
try {

    const foundUser = await User.findOne({email});

    if(foundUser){
        return next(AppError("User already exist",409))
    }else{
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
        })

    res.json({
        status:"success",
        data: user
    })
}

} catch (error) {
    next(AppError(error.message))
}
}


//Login user
export const userLoginCtrl = async(req, res, next) => {
    const {email, password} = req.body;

    try {
        //get the email
        const isUserFound = await User.findOne({email})

        if(!isUserFound){
            return next(AppError("Wrong login credential", 401))
        }

        //get password
        const isPasswordFound = await bcrypt.compare(password, isUserFound.password)

        if(!isPasswordFound){
            return next(AppError("Wrong login credential", 401))
        }

        res.json({
            status:"success",
            data:{
                firstname: isUserFound.firstname,
                lastname:isUserFound.lastname,
                email: isUserFound.email,
                token:generateToken(isUserFound._id)
            }
        })

    } catch (error) {
        next(AppError(error.message))
    }
}


export const profile = async(req,res,next) => {
    //const userid = req.params.id;
    //console.log(req.headers);
    //console.log(userid);

    try {
        const token = obtainTokenFromHeader(req)
        console.log(token);

        const foundUser = await User.findById(req.userAuth)
        
    if(!foundUser){
        return next(AppError("user not found", 404))
    }

        res.json({
            status:"success",
            data: foundUser
        })
    } catch (error) {
        next(AppError(error.message));
    }
}



// display all users
export const displayAllController = async(req,res,next)=>{
    try{
        const users = await User.find({});
        res.json({
            status:"success",
            data:users
    })
    } catch(error){
        next(AppError(error.message));
    }
  }
