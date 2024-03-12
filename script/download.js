import { canvas, brushTimeSetTimeout, BRUSH_TIME } from "./canvas.js";
import { activeToolEl } from "./tools.js";

const downloadBtn = document.getElementById("download");

downloadBtn.addEventListener("click", () => {
  downloadBtn.href = canvas.toDataURL("image/jpeg", 1);
  downloadBtn.download = "paint-example.jpeg";
  // Active Tool
  activeToolEl.textContent = "Image File Saved";
  brushTimeSetTimeout(BRUSH_TIME);
});
