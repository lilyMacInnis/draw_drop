import React from 'react'
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';

const ToolBar = (props) => {
  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded-xl shadow-lg flex flex-col gap-4 max-w-[90vw] w-fit">
        <label className="flex flex-col text-sm font-medium">
            Brush Color
            <input
                type="color"
                value={props.brushColor}
                onChange={(e) => props.setBrushColor(e.target.value)}
                className="w-10 h-10 p-0 border-none cursor-pointer"
            />
        </label>

        <label className="flex flex-col text-sm font-medium">
            Brush Size
            <input
                type="range"
                min="1"
                max="50"
                value={props.brushSize}
                onChange={(e) => props.setBrushSize(Number(e.target.value))}
                className="w-40 max-w-full"
            />
            <span>{props.brushSize}px</span>
        </label>

        {/* <button
        onClick={saveImage}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
        Save Image
        </button> */}

        <button
            onClick={props.clearCanvas}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
            Clear Canvas
        </button>

        <button
            onClick={props.undo}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
        >
            Undo
        </button>

        <button
            onClick={props.redo}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500"
        >
            Redo
        </button>

        <button 
            onClick={() => props.setIsPickingColor(true)}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500"
        >
            <ColorizeOutlinedIcon />
        </button>

        <button
            onClick={props.handleSendDrawing}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500"
            disabled={props.isSendingDrawing}
        >
            {
                props.isSendingDrawing ? (
                <>
                    Sending...
                </>
                ) : (
                <>
                    Send
                </>
                )
            }
        </button>

        {/* {imageUrl && (
        <a
            href={imageUrl}
            download="drawing.png"
            className="text-blue-600 underline text-sm"
        >
            Download Image
        </a>
        )} */}
    </div>
  )
}

export default ToolBar
