
//create account
export const createUserCtr = async(req,res) => {
    const{firstname, lastname} = req.body
    try {
        res.json({
            status:"success",
            data:"User account created successfully"
        })
    } catch (error) {
        res.json(error.message);
    }
}