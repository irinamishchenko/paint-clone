import {
  switchToBrush,
  bucketColor,
  activeToolEl,
  currentSize,
  currentColor,
  isEraser,
} from "./tools.js";
import { drawnArray, setDrawnArray } from "./storage.js";

const clearCanvasBtn = document.getElementById("clear-canvas");

const { body } = document;
const BRUSH_TIME = 1500;
let isMouseDown = false;

const canvas = document.createElement("canvas");
canvas.id = "canvas";
const context = canvas.getContext("2d");

// Create Canvas
function createCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;
  context.fillStyle = bucketColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  body.appendChild(canvas);
  switchToBrush();
}

// Draw what is stored in DrawnArray
function restoreCanvas() {
  for (let i = 1; i < drawnArray.length; i++) {
    context.beginPath();
    context.moveTo(drawnArray[i - 1].x, drawnArray[i - 1].y);
    context.lineWidth = drawnArray[i].size;
    context.lineCap = "round";
    if (drawnArray[i].eraser) {
      context.strokeStyle = bucketColor;
    } else {
      context.strokeStyle = drawnArray[i].color;
    }
    context.lineTo(drawnArray[i].x, drawnArray[i].y);
    context.stroke();
  }
}

// Clear Canvas

function clearCanvas() {
  createCanvas();
  setDrawnArray([]);
  // Active Tool
  activeToolEl.textContent = "Canvas Cleared";
  brushTimeSetTimeout(BRUSH_TIME);
}

// Store Drawn Lines in DrawnArray
function storeDrawn(x, y, size, color, erase) {
  const line = {
    x,
    y,
    size,
    color,
    erase,
  };
  drawnArray.push(line);
}

function brushTimeSetTimeout(ms) {
  setTimeout(switchToBrush, ms);
}

// Get Mouse Position
function getMousePosition(event) {
  const boundaries = canvas.getBoundingClientRect();
  return {
    x: event.clientX - boundaries.left,
    y: event.clientY - boundaries.top,
  };
}

clearCanvasBtn.addEventListener("click", clearCanvas);

// Mouse Down
canvas.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  const currentPosition = getMousePosition(event);
  context.moveTo(currentPosition.x, currentPosition.y);
  context.beginPath();
  context.lineWidth = currentSize;
  context.lineCap = "round";
  context.strokeStyle = currentColor;
});

// Mouse Move
canvas.addEventListener("mousemove", (event) => {
  if (isMouseDown) {
    const currentPosition = getMousePosition(event);
    context.lineTo(currentPosition.x, currentPosition.y);
    context.stroke();
    storeDrawn(
      currentPosition.x,
      currentPosition.y,
      currentSize,
      currentColor,
      isEraser
    );
  } else {
    storeDrawn(undefined);
  }
});

// Mouse Up
canvas.addEventListener("mouseup", () => {
  isMouseDown = false;
});

createCanvas();

export { canvas, BRUSH_TIME, createCanvas, restoreCanvas, brushTimeSetTimeout };
