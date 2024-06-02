import {User} from '../models/UserModel.js'
import jwt from 'jsonwebtoken'

export default async function userAuthVerification(req,res,next) {

    try{
    const token = req.headers?.authorization?.split(' ')[1]
    
    if (!token) {
       return res.status(401).json({ error: "Access token is required to get the access" })}

    const {userId : _id} = jwt.verify(token,process.env.JWT_SECRET)


    if (!_id){
        return res.status(401).json({ error: "Token is Not Valid -Expired" })
    }

    const user =await User.findById(_id).select('_id name')

    if (!user){
        return res.status(401).json({ error: "You are not authorized to view this resource." })
    }

    req.user = user
}
catch(e){   
    console.log(e)
    return res.status(401).json({ error: "You are not authorized to view this resource." })
}


    next()

}

