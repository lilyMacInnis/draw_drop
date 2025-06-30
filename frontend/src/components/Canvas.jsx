import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDrawStore } from '../store/useDrawStore';
import ToolBar from './ToolBar';
import ColorPicker from './ColorPicker';

export default function Canvas(props) {
  const navigate = useNavigate();
  const {id} = useParams();
  const prevIdRef = useRef(id);

  const {isAnon} = useDrawStore();

  const sendPosY = `translate-y-[${props.height +80}px]`;
  const sendWidth = `w-[${props.width +4}px]`;

  const {sendDrawing, isSendingDrawing} = useDrawStore();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPickingColor, setIsPickingColor] = useState(false);
  const [hoverColor, setHoverColor] = useState('#000000')
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = props.width;
    canvas.height = props.height;
    ctx.lineCap = 'round';
   
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const savedImage = localStorage.getItem(`savedCanvas-${id}`);
    if (savedImage && savedImage?.startsWith('data:image/png')) {
      const img = new Image();
      img.src = savedImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }

    prevIdRef.current = id;
  }, [props.width, props.height, id]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev, imageData]);
    setRedoStack([]);

    const { offsetX, offsetY } = e.nativeEvent;
    setLastPos({ x: offsetX, y: offsetY });
    setIsDrawing(true);

    ctx.beginPath();
    ctx.arc(offsetX, offsetY, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = brushColor;
    ctx.fill();
    ctx.closePath();
    saveToLocalStorage();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    setLastPos({ x: offsetX, y: offsetY });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    localStorage.setItem(`savedCanvas-${id}`, dataUrl);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem(`savedCanvas-${id}`);
    setUndoStack([]);
    setRedoStack([]);
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const newUndoStack = [...undoStack];
    const lastImage = newUndoStack.pop();
    setUndoStack(newUndoStack);

    const currentImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setRedoStack((prev) => [...prev, currentImage]);

    ctx.putImageData(lastImage, 0, 0);
    saveToLocalStorage();
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const newRedoStack = [...redoStack];
    const lastImage = newRedoStack.pop();
    setRedoStack(newRedoStack);

    const currentImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev, currentImage]);

    ctx.putImageData(lastImage, 0, 0);
    saveToLocalStorage();
  };

  const getColor = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = imageData;
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)}`;
    return hex;
  };

  const pickColor = (e) => {
    const color = getColor(e);
    setBrushColor(color);
    setIsPickingColor(false);
  };

  const handleSendDrawing = async (e) => {
    e.preventDefault();

    if(!window.confirm("Are you sure you want to send the drawing?")){
      return;
    }

    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');

    if (!url) {
        console.log("Failed to get image URL");
        return;
    }

    try {
        await sendDrawing({
            image: url,
            isAnon: isAnon
        });
    } catch (error) {
        console.log("Failed to send drawing: ", error);
        return;
    }

    clearCanvas();
    navigate('/search');
  };

  return (
    <div className="relative flex flex-col-reverse items-center justify-center align-middle w-full h-screen pb-20">
      <canvas
          ref={canvasRef}
          className="border-2 border-primary rounded-t-lg"
          onMouseDown={ (e) => {
            if(isPickingColor){
              pickColor(e);
            } else {
              startDrawing(e);
            }
          }}
          onMouseUp={stopDrawing}
          onMouseMove={ (e) => {
            if(isPickingColor){
              const color = getColor(e);
              setHoverColor(color);
            } else{
              draw(e);
            }
          }}
          onMouseLeave={stopDrawing}
      />

      <ToolBar
          brushColor={brushColor}
          isPickingColor={isPickingColor}
          hoverColor={hoverColor}
          setIsPickingColor={setIsPickingColor}
          setBrushColor={setBrushColor}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          clearCanvas={clearCanvas}
          undo={undo}
          redo={redo}

          className=''
      />

      <div className={sendPosY}>
        <button
          onClick={handleSendDrawing}
          className={`px-4 py-1.5 ${sendWidth} bg-primary border-2 border-primary text-lg font-semibold text-white rounded-b-lg hover:bg-primaryl`}
          disabled={isSendingDrawing}
        >
          {
            isSendingDrawing ? (
            <>
              Sending...
            </>
            ) : (
              isAnon ? (
                <>
                  Send Anonomously
                </>
              ) : (
                <>
                  Send
                </>
              )
            )
          }
        </button>
      </div>

    </div>
  );
}
