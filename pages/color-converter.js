import { useState } from 'react';

export default function ColorConverter() {
  const [r, setR] = useState('');
  const [g, setG] = useState('');
  const [b, setB] = useState('');
  const [colorSchemes, setColorSchemes] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (isValidRGB(r) && isValidRGB(g) && isValidRGB(b)) {
      try {
        const response = await fetch(`/api/converter?r=${r}&g=${g}&b=${b}`);
        const data = await response.json();
        setColorSchemes(data);
        setError(null);
      } catch (error) {
        setError('Failed to retrieve color schemes. Please try again.');
        console.error('Error:', error);
      }
    } else {
      setError('RGB values must be between 0 and 255.');
    }
  };

  const isValidRGB = (value) => {
    const num = parseInt(value, 10);
    return num >= 0 && num <= 255;
  };

  const rgbStyle = (color) => ({
    backgroundColor: `rgb(${color?.r || 0},${color?.g || 0},${color?.b || 0})`,
    width: '100px',
    height: '100px'
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          R:
          <input type="number" value={r} onChange={(e) => setR(e.target.value)} min="0" max="255" />
        </label>
        <label>
          G:
          <input type="number" value={g} onChange={(e) => setG(e.target.value)} min="0" max="255" />
        </label>
        <label>
          B:
          <input type="number" value={b} onChange={(e) => setB(e.target.value)} min="0" max="255" />
        </label>
        <button type="submit">Convert</button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {colorSchemes && (
        <div>
          <h2>Original Color</h2>
          <div style={rgbStyle({ r, g, b })}></div>

          <h2>Complementary Color</h2>
          <div style={rgbStyle(colorSchemes.complementary)}></div>

          <h2>Analogous Colors</h2>
          <div style={rgbStyle(colorSchemes.analogous1)}></div>
          <div style={rgbStyle(colorSchemes.analogous2)}></div>

          <h2>Split Complementary Colors</h2>
          <div style={rgbStyle(colorSchemes.splitComplementary1)}></div>
          <div style={rgbStyle(colorSchemes.splitComplementary2)}></div>

          <h2>Triadic Colors</h2>
          <div style={rgbStyle(colorSchemes.triadic1)}></div>
          <div style={rgbStyle(colorSchemes.triadic2)}></div>

          <h2>Tetradic Colors</h2>
          <div style={rgbStyle(colorSchemes.tetradic1)}></div>
          <div style={rgbStyle(colorSchemes.tetradic2)}></div>
          <div style={rgbStyle(colorSchemes.tetradic3)}></div>

          <h2>Monochromatic Colors</h2>
          {colorSchemes.monochromatic.map((color, index) => (
              <div key={index} style={rgbStyle(color)}></div>
          ))}
        </div>
      )}
    </div>
  );
}
