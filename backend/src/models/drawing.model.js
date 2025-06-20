import mongoose from "mongoose";

const drawingSchema = new mongoose.Schema(
    {
        image: String,
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverUserName: {
            type: String,
            
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        senderUserName: {
            type: String,
            
        },
        isAnon: {
            type: Boolean,
            default: true,
        }
    },
    {timestamps: true},
);

const Drawing = mongoose.model("Drawing", drawingSchema);

export default Drawing;