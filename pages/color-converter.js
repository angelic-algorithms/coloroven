import { useState } from 'react';

export default function ColorConverter() {
    const [hexValue, setHexValue] = useState('');
    const [complementaryHex, setComplementaryHex] = useState('');
  
    // Function to handle the form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(`/api/converter?hex=${hexValue}`);
        const data = await response.json();
        setComplementaryHex(data.complementaryHex);
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
  
        {complementaryHex && (
          <div>
            <div style={{ backgroundColor: `#${hexValue}`, width: '100px', height: '100px' }}></div>
            <div style={{ backgroundColor: complementaryHex, width: '100px', height: '100px' }}></div>
          </div>
        )}
      </div>
    );
  }
  