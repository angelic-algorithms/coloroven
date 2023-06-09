// export default function handler(req, res) {
//     if (req.method === 'GET') {
//       const { hex } = req.query;
  
//       // Remove the leading "#" if present
//       const sanitizedHex = hex.replace(/^#/, '');
  
//       // Convert hex to RGB
//       const r = parseInt(sanitizedHex.substring(0, 2), 16);
//       const g = parseInt(sanitizedHex.substring(2, 4), 16);
//       const b = parseInt(sanitizedHex.substring(4, 6), 16);
  
//       // Prepare the RGB object
//       const rgb = { r, g, b };
  
//       res.status(200).json({ rgb });
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
  
      // Convert complementary RGB to hex
      const complementaryHex = `#${complementaryR.toString(16).padStart(2, '0')}${complementaryG.toString(16).padStart(2, '0')}${complementaryB.toString(16).padStart(2, '0')}`;
  
      res.status(200).json({ complementaryHex });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }