import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().select("-password");

        res.status(200).json(users);
    } catch (error){
        console.log("Error in getAllUsers: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const getDrawingsSentToUser = (req, res) => {

};

export const getDrawingsSentFromUser = (req, res) => {

};

export const createDrawing = (req, res) => {

};

export const deleteDrawing = (req, res) => {

};