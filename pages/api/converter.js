export default function handler(req, res) {
  if (req.method === 'GET') {
      const { r, g, b } = req.query;

      const rVal = clamp(parseInt(r, 10), 0, 255);
      const gVal = clamp(parseInt(g, 10), 0, 255);
      const bVal = clamp(parseInt(b, 10), 0, 255);

      const originalHSL = rgbToHsl(rVal, gVal, bVal);

      // Complementary
      const complementaryHSL = [(originalHSL[0] + 180) % 360, originalHSL[1], originalHSL[2]];
      const complementaryRGB = hslToRgb(...complementaryHSL);

      // Analogous
      const analogous1RGB = hslToRgb((originalHSL[0] + 30) % 360, originalHSL[1], originalHSL[2]);
      const analogous2RGB = hslToRgb((originalHSL[0] - 30 + 360) % 360, originalHSL[1], originalHSL[2]);
      // Triadic
      const triadic1RGB = hslToRgb((originalHSL[0] + 120) % 360, originalHSL[1], originalHSL[2]);
      const triadic2RGB = hslToRgb((originalHSL[0] - 120 + 360) % 360, originalHSL[1], originalHSL[2]);

      // Tetradic
      const tetradic1HSL = complementaryHSL; 
      const tetradic2HSL = [(tetradic1HSL[0] + 90) % 360, tetradic1HSL[1], tetradic1HSL[2]];
      const tetradic1RGB = hslToRgb(...tetradic1HSL);
      const tetradic2RGB = hslToRgb(...tetradic2HSL);
      const tetradic3RGB = complementaryRGB; // Complementary color


          // Monochromatic (adjusting lightness in HSL space)
      const monoVariants = [-0.2, -0.1, 0.1, 0.2].map(delta => {
        return clamp(originalHSL[2] + delta, 0, 1);
      }).filter(lightness => {
        return Math.abs(lightness - originalHSL[2]) > 0.05; // Adjusted this filter
      });

      const monochromaticRGBs = monoVariants.map(lightness => {
        return hslToRgb(originalHSL[0], originalHSL[1], lightness);
      }).filter(color => {
        // Reduced the filtering threshold to 5 units for better results
        return Math.abs(color.r - rVal) > 5 || Math.abs(color.g - gVal) > 5 || Math.abs(color.b - bVal) > 5;
      });
            
      // Split Complementary
      const splitComplementary1HSL = [(originalHSL[0] + 150) % 360, originalHSL[1], originalHSL[2]];
      const splitComplementary2HSL = [(originalHSL[0] + 210) % 360, originalHSL[1], originalHSL[2]];
      const splitComplementary1RGB = hslToRgb(...splitComplementary1HSL);
      const splitComplementary2RGB = hslToRgb(...splitComplementary2HSL);


      res.status(200).json({
          complementary: complementaryRGB,
          analogous1: analogous1RGB,
          analogous2: analogous2RGB,
          triadic1: triadic1RGB,
          triadic2: triadic2RGB,
          tetradic1: tetradic1RGB,
          tetradic2: tetradic2RGB,
          tetradic3: tetradic3RGB,
          monochromatic: monochromaticRGBs,
          splitComplementary1: splitComplementary1RGB,
          splitComplementary2: splitComplementary2RGB
      });
  } else {
      res.status(405).json({ error: 'Method not allowed' });
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
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
    h = (60 * ((g - b) / (max - min)) + 360) % 360;
  } else if (max === g) {
    h = (60 * ((b - r) / (max - min)) + 120) % 360;
  } else {
    h = (60 * ((r - g) / (max - min)) + 240) % 360;
  }

  l = (max + min) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = (max - min) / (max + min);
  } else {
    s = (max - min) / (2.0 - max - min);
  }

  return [h, s, l];
}

// Helper function to convert HSL to RGB
function hslToRgb(h, s, l) {
  h /= 360
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
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
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
