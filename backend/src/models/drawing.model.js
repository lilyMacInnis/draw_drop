import mongoose from "mongoose";

const drawingSchema = new mongoose.Schema(
    {
        image: String,
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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