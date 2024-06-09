const jwt = require('jsonwebtoken')

const verifyToken = async (req , res , next)=>{
    if(!req.cookies.token){

    return res.json(
        { 
            message : 'You need To Login Before Performing This Task',
            status: false
        }
        )
    }
    const result = await jwt.decode(req.cookies.token , "mypassword") 
    if(result){
        req.user = result.id;
        next()
    }else{
     return   res.json(
            { message : 'your login Session Expired. Please Login Again',status: false}
        )

    }
 }

 module.exports = verifyToken