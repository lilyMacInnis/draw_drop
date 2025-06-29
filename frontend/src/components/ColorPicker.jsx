import React, { useRef, useState, useEffect } from 'react';
//import { EyeDropperIcon } from '@heroicons/react/24/outline';

const ColorPicker = ({ color, onChange, onClose }) => {
  const [hex, setHex] = useState(color);
  const [hue, setHue] = useState(0);
  const hueCanvasRef = useRef(null);
  const hueMarkerRef = useRef(null);
  const svCanvasRef = useRef(null);
  const isDraggingHue = useRef(false);

  useEffect(() => {
    drawHueSlider();
    drawSVMap(hue);
    updateHueMarker();
  }, [hue]);

  const drawHueSlider = () => {
    const canvas = hueCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#ff0000");
    gradient.addColorStop(0.17, "#ffff00");
    gradient.addColorStop(0.34, "#00ff00");
    gradient.addColorStop(0.51, "#00ffff");
    gradient.addColorStop(0.68, "#0000ff");
    gradient.addColorStop(0.85, "#ff00ff");
    gradient.addColorStop(1, "#ff0000");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawSVMap = (hueDeg) => {
    const canvas = svCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const hueColor = `hsl(${hueDeg}, 100%, 50%)`;
    ctx.fillStyle = hueColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    whiteGradient.addColorStop(0, "#fff");
    whiteGradient.addColorStop(1, "transparent");
    ctx.fillStyle = whiteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    blackGradient.addColorStop(0, "transparent");
    blackGradient.addColorStop(1, "#000");
    ctx.fillStyle = blackGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const updateHueMarker = () => {
    const marker = hueMarkerRef.current;
    if (marker && hueCanvasRef.current) {
      const canvas = hueCanvasRef.current;
      const x = (hue / 360) * canvas.width;
      marker.style.left = `${x}px`;
    }
  };

  const handleHueInteraction = (e) => {
    const rect = hueCanvasRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), hueCanvasRef.current.width);
    const ctx = hueCanvasRef.current.getContext('2d');
    const data = ctx.getImageData(x, 1, 1, 1).data;
    const [r, g, b] = data;
    const hueColor = rgbToHsl(r, g, b)[0];
    setHue(hueColor);
    drawSVMap(hueColor);
  };

  const handleHueMouseDown = (e) => {
    isDraggingHue.current = true;
    handleHueInteraction(e);
  };

  const handleHueMouseMove = (e) => {
    if (isDraggingHue.current) {
      handleHueInteraction(e);
    }
  };

  const handleMouseUp = () => {
    isDraggingHue.current = false;
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleHueMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleHueMouseMove);
    };
  }, []);

  const handleSVClick = (e) => {
    const rect = svCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = svCanvasRef.current.getContext('2d');
    const data = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = data;
    const hexColor = rgbToHex(r, g, b);
    setHex(hexColor);
    onChange(hexColor);
  };

  const handleHexInput = (e) => {
    const value = e.target.value;
    setHex(value);
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
      onChange(value);
    }
  };

  const rgbToHex = (r, g, b) => {
    return (
      '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
    );
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h *= 60;
    }
    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
  };

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white p-4 shadow-lg rounded z-50">
      <div className="relative mb-2">
        <canvas
          ref={hueCanvasRef}
          width={300}
          height={20}
          onMouseDown={handleHueMouseDown}
          className="cursor-pointer"
        />
        <div
          ref={hueMarkerRef}
          className="absolute top-0 w-1 h-5 bg-black pointer-events-none"
          style={{ transform: 'translateX(-0.5px)' }}
        />
      </div>

      <canvas
        ref={svCanvasRef}
        width={300}
        height={150}
        onClick={handleSVClick}
        className="cursor-crosshair mb-2 border"
      />

      <input
        type="text"
        value={hex}
        onChange={handleHexInput}
        className="w-full border rounded px-2 py-1 text-center"
      />

      <button onClick={onClose} className="mt-2 px-3 py-1 bg-gray-200 rounded w-full">Close</button>
    </div>
  );
};
 export default ColorPicker;