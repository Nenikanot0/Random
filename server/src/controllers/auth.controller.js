import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async(req,res) => {
    try{
        const { username,email,password } = req.body;

        if(!username || !email || !password ){
            return res.status(400).json({ message: "Fill all details"});
        }

        const userExists = await User.findOne({ email: email });

        if(userExists) {
            return res.status(409).json({message: "User already exists with the email."});
        }

        const user = await User.create({
            username,email,password
        });


        const token = jwt.sign({userId : user._id} ,process.env.JWT_SECRET, { expiresIn:"3d" });

        res.cookie("token",token);

        res.status(201).json({
            user:{
                _id:user._id,
                username:user.username,
                email:user.email,
            },
            token
        });
    }catch(error){
        console.log(error.message);
        return res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : error.message});
    }
}