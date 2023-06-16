

// export default function handler(req, res) {
//     if (req.method === 'GET') {
//       const { hex } = req.query;
  
//       // Remove the leading "#" if present
//       const sanitizedHex = hex.replace(/^#/, '');
  
//       // Convert hex to RGB
//       const r = parseInt(sanitizedHex.substring(0, 2), 16);
//       const g = parseInt(sanitizedHex.substring(2, 4), 16);
//       const b = parseInt(sanitizedHex.substring(4, 6), 16);
  
//       // Calculate the complementary color
//       const complementaryR = 255 - r;
//       const complementaryG = 255 - g;
//       const complementaryB = 255 - b;
  
//       // Convert complementary RGB to hex
//       const complementaryHex = `#${complementaryR.toString(16).padStart(2, '0')}${complementaryG.toString(16).padStart(2, '0')}${complementaryB.toString(16).padStart(2, '0')}`;
  
//       res.status(200).json({ complementaryHex });
//     } else {
//       res.status(405).json({ error: 'Method not allowed' });
//     }
//   }

// pages/api/converter.js

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { hex } = req.query;

    // Remove the leading "#" if present
    const sanitizedHex = hex.replace(/^#/, '');

    // Convert hex to RGB
    const r = parseInt(sanitizedHex.substring(0, 2), 16);
    const g = parseInt(sanitizedHex.substring(2, 4), 16);
    const b = parseInt(sanitizedHex.substring(4, 6), 16);

    // Calculate the complementary color
    const complementaryR = 255 - r;
    const complementaryG = 255 - g;
    const complementaryB = 255 - b;

    // Calculate the analogous colors (30 degrees apart)
    const analogous1HSL = rgbToHsl(r, g, b + 30);
    const analogous2HSL = rgbToHsl(r, g, b - 30);

    // Calculate the split complementary colors (150 degrees apart)
    const splitComplementary1HSL = rgbToHsl(r, g, b + 150);
    const splitComplementary2HSL = rgbToHsl(r, g, b - 150);

    // Calculate the triadic colors (120 degrees apart)
    const triadic1HSL = rgbToHsl(r, g, b + 120);
    const triadic2HSL = rgbToHsl(r, g, b - 120);

    // Calculate the tetradic colors (60 degrees apart)
    const tetradic1HSL = rgbToHsl(r, g, b + 60);
    const tetradic2HSL = rgbToHsl(r, g, b - 60);

    // Calculate the monochromatic colors (10% increments/decrements)
    const monochromatic1HSL = rgbToHsl(r - 25, g - 25, b - 25);
    const monochromatic2HSL = rgbToHsl(r - 50, g - 50, b - 50);
    const monochromatic3HSL = rgbToHsl(r - 75, g - 75, b - 75);
    const monochromatic4HSL = rgbToHsl(r + 25, g + 25, b + 25);
    const monochromatic5HSL = rgbToHsl(r + 50, g + 50, b + 50);
    const monochromatic6HSL = rgbToHsl(r + 75, g + 75, b + 75);

    // Convert HSL values back to hex
    const complementaryHex = hslToHex(complementaryR, complementaryG, complementaryB);
    const analogous1Hex = hslToHex(analogous1HSL[0], analogous1HSL[1], analogous1HSL[2]);
    const analogous2Hex = hslToHex(analogous2HSL[0], analogous2HSL[1], analogous2HSL[2]);
    const splitComplementary1Hex = hslToHex(splitComplementary1HSL[0], splitComplementary1HSL[1], splitComplementary1HSL[2]);
    const splitComplementary2Hex = hslToHex(splitComplementary2HSL[0], splitComplementary2HSL[1], splitComplementary2HSL[2]);
    const triadic1Hex = hslToHex(triadic1HSL[0], triadic1HSL[1], triadic1HSL[2]);
    const triadic2Hex = hslToHex(triadic2HSL[0], triadic2HSL[1], triadic2HSL[2]);
    const tetradic1Hex = hslToHex(tetradic1HSL[0], tetradic1HSL[1], tetradic1HSL[2]);
    const tetradic2Hex = hslToHex(tetradic2HSL[0], tetradic2HSL[1], tetradic2HSL[2]);
    const monochromatic1Hex = hslToHex(monochromatic1HSL[0], monochromatic1HSL[1], monochromatic1HSL[2]);
    const monochromatic2Hex = hslToHex(monochromatic2HSL[0], monochromatic2HSL[1], monochromatic2HSL[2]);
    const monochromatic3Hex = hslToHex(monochromatic3HSL[0], monochromatic3HSL[1], monochromatic3HSL[2]);
    const monochromatic4Hex = hslToHex(monochromatic4HSL[0], monochromatic4HSL[1], monochromatic4HSL[2]);
    const monochromatic5Hex = hslToHex(monochromatic5HSL[0], monochromatic5HSL[1], monochromatic5HSL[2]);
    const monochromatic6Hex = hslToHex(monochromatic6HSL[0], monochromatic6HSL[1], monochromatic6HSL[2]);

    res.status(200).json({
      complementaryHex,
      analogous1Hex,
      analogous2Hex,
      splitComplementary1Hex,
      splitComplementary2Hex,
      triadic1Hex,
      triadic2Hex,
      tetradic1Hex,
      tetradic2Hex,
      monochromatic1Hex,
      monochromatic2Hex,
      monochromatic3Hex,
      monochromatic4Hex,
      monochromatic5Hex,
      monochromatic6Hex,
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Helper function to convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l;

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / (max - min)) % 6;
  } else if (max === g) {
    h = (b - r) / (max - min) + 2;
  } else if (max === b) {
    h = (r - g) / (max - min) + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) {
    h += 360;
  }

  l = (max + min) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = (max - min) / (max + min);
  } else {
    s = (max - min) / (2 - max - min);
  }

  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return [h, s, l];
}

// Helper function to convert HSL to RGB
function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    g = Math.round(hue2rgb(p, q, h) * 255);
    b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
  }

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}