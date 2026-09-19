import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"username required"],
        trim: true
    },
    email: {
        type: String,
        required: [true,"email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail,"valid email required"]
    },
    password: {
        type: String,
        required: [true,"password is required"],
        minlength: [6,"password should be atleast 6 length"],
        select: false //Excludes password from queries by default
    }
},{ timestamps: true });

userSchema.pre("save",async function() {

    if(!this.isModified("password")){
        return;
    }

    this.password = await bcrypt.hash(this.password,10); //hash before saving

    return;
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


const User = mongoose.model("User",userSchema);

export default User;