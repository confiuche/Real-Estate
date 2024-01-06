import User from "../model/userModel.js";
import AppError from "../utils/AppErr.js";


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
        return next(AppError(`${foundUser} already `,409))
    }else{
        const user = await User.create({
            firstname,
            lastname,
            email,
            password
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
export const userLoginCtrl = async(req,res,next) => {
    const {email, password} = req.body;

    try {
        //get the email
        const isUserFound = await User.findOne({email})

        if(!isUserFound){
            return next(AppError("Wrong login credential", 401))
        }

        //get password
        const isPasswordFound = await User.findOne({password})

        if(!isPasswordFound){
            return next(AppError("Wrong login credential", 401))
        }

        res.json({
            status:"success",
            data:{
                firstname: isUserFound.firstname,
                lastname:isUserFound.lastname,
                email: isUserFound.email
            }
        })

    } catch (error) {
        next(AppError(error.message))
    }
}