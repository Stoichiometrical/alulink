import User from "../models/Alumni.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            fullName:req.body.fullName,
            email: req.body.email,
            password: hash,
            graduationYear: req.body.graduationYear,
            degreeProgram: req.body.degreeProgram,
            role: req.body.role
    
        });

        await newUser.save();
        res.status(201).json({ message: "Successfully registered user", user: newUser });
    } catch (e) {
        next(e);
    }
};

// Get User
export const getUser = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0, isAdmin: 0 });
        res.status(200).json(users);
    } catch (e) {
        next(e);
    }
};
 const JWT_SECRET='ALUALUMNI'
// Login
export const login = async (req, res, next) => {
    
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found"));
        

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        
        if (!isPasswordCorrect) return next(createError(400, "Wrong password"));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).json({ message: "Success", ...otherDetails }); // Set message property to "Success"
    } catch (e) {
        next(e);
    }
};
