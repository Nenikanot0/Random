import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const authMiddleware = async(req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({ message:"Token is missing" });
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded.userId }).select("-password");
        
        if (!user) {
            return res.status(401).json({ message: "User not found or token expired" });
        }

        req.user=user;

        next();

    }catch(err){
        return res.status(401).json({ message:"Token is invalid" });
    }
}