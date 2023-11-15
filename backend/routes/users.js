import express from 'express';
import {
    deleteUser,
    getUsers,
    updateUser
} from "../controllers/users.js";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verifyToken.js";
import {getUser} from "../controllers/auth.js";
const usersRouter = express.Router();


// usersRouter.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("Hello User, you are authenticated")
// })
//
usersRouter.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("You can delete the user")
})

usersRouter.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("Hello admin, you are authenticated")
})

//UPDATE
usersRouter.put("/:id",updateUser)


//DELETE
usersRouter.delete("/:id",deleteUser)
//
// // GET
usersRouter.get("/user/:id",getUser)


//GET ALL
usersRouter.get("/",getUsers)





export default usersRouter;