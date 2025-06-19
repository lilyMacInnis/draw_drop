import React, { useRef, useState, useEffect } from 'react';

export default function Canvas(props) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [imageUrl, setImageUrl] = useState('');
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = props.width;
    canvas.height = props.height;
    ctx.lineCap = 'round';

    const savedImage = localStorage.getItem('savedCanvas');
    if (savedImage) {
      const img = new Image();
      img.src = savedImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [props.width, props.height]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev, imageData]);
    setRedoStack([]);

    const { offsetX, offsetY } = e.nativeEvent;
    setLastPos({ x: offsetX, y: offsetY });
    setIsDrawing(true);
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

  const saveImage = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    setImageUrl(url);
  };

  const saveToLocalStorage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    localStorage.setItem('savedCanvas', dataUrl);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem('savedCanvas');
    setImageUrl('');
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

      <div className="absolute top-4 left-4 bg-white p-4 rounded-xl shadow-lg flex flex-col gap-4 max-w-[90vw] w-fit">
        <label className="flex flex-col text-sm font-medium">
          Brush Color
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="w-10 h-10 p-0 border-none cursor-pointer"
          />
        </label>

        <label className="flex flex-col text-sm font-medium">
          Brush Size
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-40 max-w-full"
          />
          <span>{brushSize}px</span>
        </label>

        <button
          onClick={saveImage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Save Image
        </button>

        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
          Clear Canvas
        </button>

        <button
          onClick={undo}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
        >
          Undo
        </button>

        <button
          onClick={redo}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500"
        >
          Redo
        </button>

        {imageUrl && (
          <a
            href={imageUrl}
            download="drawing.png"
            className="text-blue-600 underline text-sm"
          >
            Download Image
          </a>
        )}
      </div>
    </div>
  );
}
