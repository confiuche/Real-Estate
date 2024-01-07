import { obtainTokenFromHeader } from "../utils/obtainTokenFromHeader.js";
import { verifyToken } from "../utils/verifytoken.js";

export const isLogin = (req, res, next) => {
    //get token headers
    const token = obtainTokenFromHeader(req);

    //verify
    const userDecoded = verifyToken(token);

    req.userAuth = userDecoded.id;

    if(!userDecoded){
        return res.json({
            status: "error",
            message: "Kindly login, because it seem the token is either expired or invalid"
        })
    }else{
        next()
    }
}