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
        const drawings = await Drawing.find({senderId:senderId});
        res.status(200).json(drawings);

    } catch (error){
        console.log("Error in getDrawingsSentFromUser: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const sendDrawing = async (req, res) => {
    try{

        const {image} = req.body;
        const {userId:receiverId} = req.params;

        let sentFrom;
        if(req.user){
            sentFrom = req.user._id;
        }

        const newDrawing = new Drawing ({
            image,
            receiverId,
            senderId: sentFrom,
        });

        await newDrawing.save();

        res.status(201).json(newDrawing);

    } catch (error) {
        console.log("Error in sendDrawing: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const deleteDrawing = async (req, res) => {
    try{
        const deletedDrawing = await Drawing.findByIdAndDelete(req.params.drawingId);
        if(!deleteDrawing){
            return res.status(400).json({message: "Drawing not found"});
        }
        res.status(200).json({message: "Drawing deleted successfully"});
    } catch (error){
        console.log("Error in deleteDrawing: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};