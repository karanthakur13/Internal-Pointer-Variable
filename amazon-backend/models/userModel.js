import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
{
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false, required: true},
    greenCredits:{type:Number,default:0,required:true}
    //added greenCredits to the model
},
{
    timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

export default User;