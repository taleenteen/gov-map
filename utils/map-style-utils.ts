import { MapRef } from "react-map-gl/mapbox";

// Helper to load an image from a URL (or data URL)
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Function to generate a colored pin with an icon
export async function generatePinImage(
  map: MapRef,
  id: string,
  color: string,
  iconSvgString: string,
  scale: number = 1.0
) {
  if (map.hasImage(id)) return;

  const size = 48 * scale; // Pin size scaled
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Draw Circle
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw Icon
  // We need to convert the SVG string to a data URL or draw it
  // For simplicity, we assume iconSvgString is a valid SVG XML
  const svgBlob = new Blob([iconSvgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  try {
    const img = await loadImage(url);
    // Draw icon centered
    const iconSize = 24;
    ctx.drawImage(
      img,
      (size - iconSize) / 2,
      (size - iconSize) / 2,
      iconSize,
      iconSize
    );

    // Add to map
    const imageData = ctx.getImageData(0, 0, size, size);
    map.addImage(id, imageData);
  } catch (e) {
    console.error("Failed to load icon for pin", id, e);
  } finally {
    URL.revokeObjectURL(url);
  }
}

// SVG Strings for Lucide Icons (simplified for brevity, or we can fetch them)
// Ideally, we would use a library to get SVG strings, but for now we can hardcode the ones we use or fetch them.
// A better approach for "dynamic" icons in Mapbox is tricky.
// Alternative: Use a sprite sheet.
// For this task, I will use a simple placeholder SVG string if I can't easily get the Lucide SVG string in browser.
// BUT, Lucide icons are React components. We can't easily get their SVG string in a utility function without rendering them.
// WORKAROUND: We will use a predefined set of SVG paths for the icons we need (Droplet, Flame, Video, Home, Waves, Cylinder).

export const ICONS = {
  droplet: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-2-3-2-3-1.5-2-5-10-5-10S7 10 5.5 12a7 7 0 0 0 6.5 10z"/></svg>`,
  flame: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3.7 2.5 3.1 4.1 4.4 4.1z"/></svg>`,
  video: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  waves: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`,
  cylinder: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/></svg>`,
};
