import { createCanvas, restoreCanvas } from "./canvas.js";

const brushColorBtn = document.getElementById("brush-color");
const activeToolEl = document.getElementById("active-tool");
const brushIcon = document.getElementById("brush");
const brushSize = document.getElementById("brush-size");
const brushSlider = document.getElementById("brush-slider");
const bucketColorBtn = document.getElementById("bucket-color");
const eraser = document.getElementById("eraser");

let isEraser = false;
let currentColor = "#A51DAB";
let currentSize = 10;
let bucketColor = "#FFFFFF";

// Formatting Brush Size
function displayBrushSize() {
  if (brushSlider.value < 10) {
    brushSize.textContent = `0${brushSlider.value}`;
  } else {
    brushSize.textContent = brushSlider.value;
  }
}

// Setting Brush Size
function setBruchSize() {
  currentSize = brushSlider.value;
  displayBrushSize();
}

// Setting Brush Color

function setBrushColor() {
  isEraser = false;
  currentColor = `#${brushColorBtn.value}`;
}

// Setting Background Color

function setBackgroundColor() {
  bucketColor = `#${bucketColorBtn.value}`;
  createCanvas();
  restoreCanvas();
}

// Eraser

function setEraser() {
  isEraser = true;
  brushIcon.style.color = "white";
  eraser.style.color = "black";
  activeToolEl.textContent = "Eraser";
  currentColor = bucketColor;
  currentSize = 50;
}

// Switch back to Brush
function switchToBrush() {
  isEraser = false;
  activeToolEl.textContent = "Brush";
  brushIcon.style.color = "black";
  eraser.style.color = "white";
  currentColor = `#${brushColorBtn.value}`;
  currentSize = 10;
  brushSlider.value = 10;
  displayBrushSize();
}

// Event Listeners
brushIcon.addEventListener("click", switchToBrush);
brushSlider.addEventListener("change", setBruchSize);
brushColorBtn.addEventListener("change", setBrushColor);
bucketColorBtn.addEventListener("change", setBackgroundColor);
eraser.addEventListener("click", setEraser);

export {
  activeToolEl,
  isEraser,
  currentColor,
  currentSize,
  bucketColor,
  switchToBrush,
};
