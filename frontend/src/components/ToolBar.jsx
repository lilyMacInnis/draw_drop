import React, { useState } from 'react'
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import ColorPicker from './ColorPicker';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDrawStore } from '../store/useDrawStore';

const ToolBar = (props) => {
  const {isAnon, setIsAnon, setDimensions} = useDrawStore();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleClearCanvas = () => {
    if(window.confirm("Are you sure you want to delete this drawing?")){
        props.clearCanvas();
    };
  };

  const handleLandscape= () => {
    if(window.innerWidth < window.innerHeight){
        setDimensions({width: window.innerWidth * 0.6, height: window.innerWidth * 0.6 * (2/3)});
    } else{
        setDimensions({width: window.innerHeight * 0.6, height: window.innerHeight * 0.6 * (2/3)});
    }
  };

  const handlePortrait= () => {
    if(window.innerWidth < window.innerHeight){
        setDimensions({width: window.innerWidth * 0.6, height: window.innerWidth * 0.6 * (2/3)});
    } else{
        setDimensions({width: window.innerHeight * 0.6 * (2/3), height: window.innerHeight * 0.6});
    }
  };

  const handleSquare= () => {
    if(window.innerWidth < window.innerHeight){
        setDimensions({width: window.innerWidth * 0.6, height: window.innerWidth * 0.6});
    } else{
        setDimensions({width: window.innerHeight * 0.6, height: window.innerHeight * 0.6});
    }
  };

  return (
    <div>
        <div>
            <div className='flex pt-1'>
                <div className=' text-base text-textl flex items-center'>Anonomous: </div>
                <div className="relative flex items-center pl-1 pr-5">
                    <label className="relative block w-10 h-5">
                    <input
                        type="checkbox"
                        checked={isAnon}
                        onChange={() => setIsAnon(!isAnon)}
                        className="sr-only peer"
                    />
                    <div className="absolute w-full h-full bg-red-500/30 hover:bg-red-500/50 ring-2 ring-primary rounded-full after:bg-red-500 peer-checked:after:bg-green-500
                        peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:bg-green-500/30 peer-checked:hover:bg-green-500/50  
                        after:absolute after:top-0.5 after:start-[4px] after:rounded-full after:h-4 after:w-4 after:transition-all" />
                    <span className="absolute left-0 transition-transform duration-300 peer-checked:hidden">
                        <CloseIcon className="px-1 pb-2 pt-0 text-background" />
                    </span>
                    <span className="absolute left-4 hidden peer-checked:inline transition-transform duration-300">
                        
                        <CheckIcon className="px-1 pb-2 pt-0 text-background" />
                    </span>
                    </label>
                </div>
            </div>

            <div className='flex gap-1 text-textl pb-1'>
                <div className='pt-1'>Size: </div>

                <button 
                    className='flex items-center rounded hover:bg-primary/30 pr-1'
                    onClick={handleLandscape}
                >
                    <div className='px-1'>Landscape</div>
                    <div className='w-6 h-4 bg-white border border-primary pr-2'/>
                </button>
                
                <button 
                    className='flex items-center rounded hover:bg-primary/30 pr-1 py-1'
                    onClick={handlePortrait}
                >
                    <div className='px-1'>Portrait</div>
                    <div className='w-4 h-6 bg-white border border-primary pr-2'/>
                </button>

                <button 
                    className='flex items-center rounded hover:bg-primary/30 pr-1'
                    onClick={handleSquare}
                >
                    <div className='px-1'>Square</div>
                    <div className='w-5 h-5 bg-white border border-primary pr-2'/>
                </button>
            </div>
        </div>
        <div className="flex bg-background border-2 border-primary rounded-lg max-w-[60vw] w-fit">

            <div className='flex gap-1 sm:grid-cols-3 pb-0'>
                <button
                    onClick={props.undo}
                    className="p-1 pr-0"
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
                </label>

                {showColorPicker && (
                    <ColorPicker
                        color={props.brushColor}
                        onChange={props.setBrushColor}
                        onClose={() => setShowColorPicker(false)}
                    />
                )}

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

                <button
                    onClick={handleClearCanvas}
                    className="p-1"
                >
                    <DeleteOutlineIcon className='text-red-600 hover:text-red-400'/>
                </button>
            </div>

        </div>
    </div>
    
  )
}

export default ToolBar
