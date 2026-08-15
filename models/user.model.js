import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            minlength: [3, "Username must be at least 3 characters long"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },
        age: {
            type: Number,
            min: [18, "Age must be at least 18"]
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema);
