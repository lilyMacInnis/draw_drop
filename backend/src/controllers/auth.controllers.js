import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {userName, email, password} = req.body;
    try{
        // check if all fields entered
        if(!userName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        // check for pass length and existing email
        if (password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message: "Email already exists"});
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = new User ({
            userName,
            email,
            password: hashedPassword,
        });

        if(newUser){
            generateToken(newUser._id, res); // generate jwt token
            await newUser.save(); //save user to db

            res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
            });
        } else{
            res.status(400).json({message: "Invalid user data"});
        }

    } catch (error){
        console.log("Error in singup controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        };

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            res.status(400).json({message: "Invalid credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
        });
    } catch (error){
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const logout = (req, res) => {
    try{
        // clear cookie
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    }catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const checkAuth = (req, res) => {
    try{
        // send authenticated user to client
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};