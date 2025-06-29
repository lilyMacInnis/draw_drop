import React, { useState } from 'react'
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import ColorPicker from './ColorPicker';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ToolBar = (props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleClearCanvas = () => {
    if(window.confirm("Are you sure you want to delete this drawing?")){
        props.clearCanvas();
    };
  };

  return (
    <div className="flex bg-background border-x-2 border-t-2 border-primary rounded-t-lg gap-1 max-w-[90vw] w-fit">
        
        <button
            onClick={props.undo}
            className="p-1"
        >
            <UndoIcon className='text-primary hover:text-primaryl'/>
        </button>

        <button
            onClick={props.redo}
            className="pr-5"
        >
            <RedoIcon className='text-primary hover:text-primaryl'/>
        </button>

        <button 
            onClick={() => props.setIsPickingColor(!props.isPickingColor)}
            className=""
        >
            <ColorizeOutlinedIcon className='text-primary hover:text-primaryl'/>
        </button>
        
        <label className="flex items-center text-sm font-medium pr-5">
            <div
                className="size-6 rounded-full border border-textd cursor-pointer"
                style={{ backgroundColor: props.brushColor }}
                onClick={() => setShowColorPicker(!showColorPicker)}
            />
            {/* <input
                type="color"
                value={props.isPickingColor ? props.hoverColor : props.brushColor}
                onChange={(e) => props.setBrushColor(e.target.value)}
                className="w-10 h-10 p-0 border-none cursor-pointer"
            /> */}
        </label>

        <label className="flex items-center text-sm text-bgDark font-medium pr-5">
            <input
                type="range"
                min="2"
                max="20"
                step={2}
                value={props.brushSize}
                onChange={(e) => props.setBrushSize(Number(e.target.value))}
                className="w-20 max-w-full h-2 bg-background border-2 border-primary rounded-lg appearance-none cursor-pointer"
            />
        </label>

        {/* <button
        onClick={saveImage}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
        Save Image
        </button> */}

        <button
            onClick={handleClearCanvas}
            className="p-1"
        >
            <DeleteOutlineIcon className='text-red-600 hover:text-red-400'/>
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
        {showColorPicker && (
        <ColorPicker
          color={props.brushColor}
          onChange={props.setBrushColor}
          onClose={() => setShowColorPicker(false)}
        />
      )}
    </div>
    
  )
}

export default ToolBar
