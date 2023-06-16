import { useState } from 'react';

// export default function ColorConverter() {
//     const [hexValue, setHexValue] = useState('');
//     const [complementaryHex, setComplementaryHex] = useState('');
  
//     // Function to handle the form submission
//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       try {
//         const response = await fetch(`/api/converter?hex=${hexValue}`);
//         const data = await response.json();
//         setComplementaryHex(data.complementaryHex);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
  
//     return (
//       <div>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Hex Value:
//             <input type="text" value={hexValue} onChange={(e) => setHexValue(e.target.value)} />
//           </label>
//           <button type="submit">Convert</button>
//         </form>
  
//         {complementaryHex && (
//           <div>
//             <div style={{ backgroundColor: `#${hexValue}`, width: '100px', height: '100px' }}></div>
//             <div style={{ backgroundColor: complementaryHex, width: '100px', height: '100px' }}></div>
//           </div>
//         )}
//       </div>
//     );
//   }
  
export default function ColorConverter() {
  const [hexValue, setHexValue] = useState('');
  const [colorSchemes, setColorSchemes] = useState(null);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/converter?hex=${hexValue}`);
      const data = await response.json();
      setColorSchemes(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Hex Value:
          <input type="text" value={hexValue} onChange={(e) => setHexValue(e.target.value)} />
        </label>
        <button type="submit">Convert</button>
      </form>

      {colorSchemes && (
        <div>
          <h2>Complementary Color</h2>
          <div style={{ backgroundColor: `#${hexValue}`, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.complementaryHex, width: '100px', height: '100px' }}></div>

          <h2>Analogous Colors</h2>
          <div style={{ backgroundColor: `#${hexValue}`, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.analogous1Hex, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.analogous2Hex, width: '100px', height: '100px' }}></div>

          <h2>Split Complementary Colors</h2>
          <div style={{ backgroundColor: `#${hexValue}`, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.splitComplementary1Hex, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.splitComplementary2Hex, width: '100px', height: '100px' }}></div>

          <h2>Triadic Colors</h2>
          <div style={{ backgroundColor: `#${hexValue}`, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.triadic1Hex, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.triadic2Hex, width: '100px', height: '100px' }}></div>

          <h2>Tetradic Colors</h2>
          <div style={{ backgroundColor: `#${hexValue}`, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.tetradic1Hex, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.tetradic2Hex, width: '100px', height: '100px' }}></div>

          <h2>Monochromatic Colors</h2>
          <div style={{ backgroundColor: `#${hexValue}`, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.monochromatic1Hex, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.monochromatic2Hex, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.monochromatic3Hex, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.monochromatic4Hex, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.monochromatic5Hex, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: colorSchemes.monochromatic6Hex, width: '100px', height: '100px' }}></div>
        </div>
      )}
    </div>
  );
}
