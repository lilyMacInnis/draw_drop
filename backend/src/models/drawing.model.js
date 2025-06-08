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
        }
    },
    {timestamps: true},
);

const Drawing = mongoose.model("Drawing", userSchema);

export default Drawing;