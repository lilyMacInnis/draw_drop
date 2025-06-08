import Drawing from "../models/drawing.model.js";
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

export const getDrawingsSentToUser = async (req, res) => {
    try{
        const receiverId = req.user._id;
        const drawings = await Drawing.find({receiverId:receiverId});
        res.status(200).json(drawings);

    } catch (error){
        console.log("Error in getDrawingsSentToUser: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const getDrawingsSentFromUser = async (req, res) => {
    try{
        const senderId = req.user._id;
        const drawings = await Drawing.find({senderId:receiverId});
        res.status(200).json(drawings);

    } catch (error){
        console.log("Error in getDrawingsSentFromUser: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const sendDrawing = (req, res) => {

};

export const deleteDrawing = (req, res) => {

};