import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDrawStore } from '../store/useDrawStore';
import ToolBar from './ToolBar';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

export default function Canvas() {
  const navigate = useNavigate();
  const {id} = useParams();
  const prevIdRef = useRef(id);

  const {isAnon, sendDrawing, isSendingDrawing, dimensions, setCanvasCleared} = useDrawStore();
  const {authUser} = useAuthStore();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPickingColor, setIsPickingColor] = useState(false);
  const [hoverColor, setHoverColor] = useState('#000000')
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(4);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
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
  }, [dimensions, id]);

  useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  let drawing = false;

  const getTouchPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  };

  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent scrolling
    drawing = true;

    const pos = getTouchPos(e);

    // Set current brush color and size
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const handleTouchMove = (e) => {
    if (!drawing) return;

    const pos = getTouchPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const handleTouchEnd = () => {
    drawing = false;
    ctx.closePath();
  };

  // Attach listeners
  canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  canvas.addEventListener('touchend', handleTouchEnd);

  return () => {
    canvas.removeEventListener('touchstart', handleTouchStart);
    canvas.removeEventListener('touchmove', handleTouchMove);
    canvas.removeEventListener('touchend', handleTouchEnd);
  };
}, [brushColor, brushSize]); // <-- re-run if brush settings change



  const startDrawing = (e) => {
    setCanvasCleared(false);
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
    setCanvasCleared(true);
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
        toast.error("Something went wrong: " + error);
        return;
    }

    clearCanvas();
    toast.success("Drawing sent!");
    navigate('/search');
  };

  return (
    <div className="relative flex flex-col-reverse items-center justify-end gap-1 w-full pb-20 ">
      <canvas
          ref={canvasRef}
          className="border-2 border-primary rounded-lg"
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

      <div className={`${authUser ? (
        (window.innerWidth > window.innerHeight) ? (
          `translate-y-[91vh]`
        ) : (
          (dimensions.width == dimensions.height) ? (
            `translate-y-[82vh]`
          ) : (
            (dimensions.width > dimensions.height) ? (
              `translate-y-[65.75vh]`
            ) : (
              `translate-y-[106.1vh]`
            )
          )
        )
      ) : (
        (window.innerWidth > window.innerHeight) ? (
          `translate-y-[85.75vh]`
        ) : (
          (dimensions.width == dimensions.height) ? (
            `translate-y-[76.25vh]`
          ) : (
            (dimensions.width > dimensions.height) ? (
              `translate-y-[60vh]`
            ) : (
              `translate-y-[100.3vh]`
            )
          )
        )
      )
        
      }`}>
        <button
          onClick={handleSendDrawing}
          className={`px-4 py-1.5 bg-primary border-2 border-primary hover:border-primaryl text-lg font-semibold text-white rounded-lg hover:bg-primaryl`}
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
