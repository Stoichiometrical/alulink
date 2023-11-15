import {createError} from "./error.js";
import jwt from "jsonwebtoken";


export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        next(createError(401,"You are not authenticated"))
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return createError(403,"Token is invalid")
        req.user = user
        next();
    })
}

export const verifyUser =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
            if(req.user.id ===req.params.id || req.user.isAdmin){
                next()
            }else{
                return   createError(403,"You are not authorized ")
            }
        }
    )
}

export const verifyAdmin =(req,res,next)=>{

    verifyToken(req,res,next,()=>{
            if(req.user.isAdmin === true ){
                console.log("You are an admin")
                next()
            }else{
                console.log("Not an admin")
                return   createError(403,"You are not an admin")
            }
        }
    )
}