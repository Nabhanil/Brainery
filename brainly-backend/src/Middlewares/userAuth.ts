import { Request, Response, NextFunction } from "express"
import  jwt  from "jsonwebtoken"
const JWT_SECRET = 'lucifer'
export const userAuth = (req:Request  ,res:Response, next:NextFunction)=>{
    const token = req.headers.token
    if(!token){
        res.status(403).json({
            message:"Token is absent"
        })
        return
    }else{
        //@ts-ignore
        const decodedToken = jwt.verify(token,JWT_SECRET)
        //@ts-ignore
        req.id = decodedToken.id
        next()
    }
    
    

}