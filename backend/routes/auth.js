import express from "express"
import {login, register} from "../controllers/auth.js";
const router = express.Router()


//REGISTER USER
router.post('/register',register)

//LOGIN USER
router.post('/login',login)

router.get('/logout',(req,res)=>{
    res.send("SUCCESSFULLY LOGGED OUT!" )
})

export default  router;