import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDrawStore } from '../store/useDrawStore';
import ToolBar from './ToolBar';

export default function Canvas(props) {
  const navigate = useNavigate();
  const {id} = useParams();
  const prevIdRef = useRef(id);

  const {sendDrawing, isSendingDrawing} = useDrawStore();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  const handleSendDrawing = async (e) => {
    e.preventDefault();

    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');

    if (!url) {
        console.log("Failed to get image URL");
        return;
    }

    try {
        await sendDrawing({
            image: url,
            isAnon: props.isAnon
        });
    } catch (error) {
        console.log("Failed to send drawing: ", error);
        return;
    }

    clearCanvas();
    navigate('/search');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
        <canvas
            ref={canvasRef}
            className=""
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
        />

        <ToolBar
            brushColor={brushColor}
            setBrushColor={setBrushColor}
            brushSize={brushSize}
            setBrushSize={setBrushSize}
            clearCanvas={clearCanvas}
            undo={undo}
            redo={redo}
            handleSendDrawing={handleSendDrawing}
            isSendingDrawing={isSendingDrawing}
        />
    </div>
  );
}
