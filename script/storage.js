import { brushTimeSetTimeout, BRUSH_TIME, restoreCanvas } from "./canvas.js";
import { activeToolEl } from "./tools.js";

const saveStorageBtn = document.getElementById("save-storage");
const loadStorageBtn = document.getElementById("load-storage");
const clearStorageBtn = document.getElementById("clear-storage");

let drawnArray = [];

// Setting new values from other files
function setDrawnArray(value) {
  drawnArray = value;
}

// Save to Local Storage
function saveToLocalStorage() {
  localStorage.setItem("savedCanvas", JSON.stringify(drawnArray));
  // Active Tool
  activeToolEl.textContent = "Canvas Saved";
  brushTimeSetTimeout(BRUSH_TIME);
}

// Load from Local Storage

function loadFromLocalStorage() {
  if (localStorage.getItem("savedCanvas")) {
    drawnArray = JSON.parse(localStorage.savedCanvas);
    restoreCanvas();
    // Active Tool
    activeToolEl.textContent = "Canvas Loaded";
    brushTimeSetTimeout(BRUSH_TIME);
  } else {
    activeToolEl.textContent = "No Canvas Found";
    brushTimeSetTimeout(BRUSH_TIME);
  }
}

// Clear Local Storage

function clearLocalStorage() {
  localStorage.removeItem("savedCanvas");
  // Active Tool
  activeToolEl.textContent = "Local Storage Cleared";
  brushTimeSetTimeout(BRUSH_TIME);
}

// Event Listeners

saveStorageBtn.addEventListener("click", saveToLocalStorage);
loadStorageBtn.addEventListener("click", loadFromLocalStorage);
clearStorageBtn.addEventListener("click", clearLocalStorage);

export { drawnArray, setDrawnArray };
