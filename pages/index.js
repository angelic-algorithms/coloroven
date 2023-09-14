import { useState } from 'react';

export default function ColorConverter() {
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);
  const [colorSchemes, setColorSchemes] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  const globalStyle = {
    fontFamily: 'Oswald, sans-serif',
    fontSize: '14px' // or whatever size you want
  };

  const rgbStyle = (color) => ({
    backgroundColor: `rgb(${color?.r || 0},${color?.g || 0},${color?.b || 0})`,
    width: '100px',
    height: '100px',
    margin: '0 10px'
  });

  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9'
  };

  return (
    <div className="container text-center my-4">

      <form onSubmit={handleSubmit} className="mb-4">
        <p className="font-weight-bold">Set Your RGB Slider Values</p>
        <div className="form-group">
          <label>
            R: <input type="range" value={r} onChange={(e) => setR(e.target.value)} min="0" max="255" className="form-range"/>
            <span>{r}</span>
          </label>
        </div>

        <div className="form-group">
          <label>
            G: <input type="range" value={g} onChange={(e) => setG(e.target.value)} min="0" max="255" className="form-range"/>
            <span>{g}</span>
          </label>
        </div>

        <div className="form-group">
          <label>
            B: <input type="range" value={b} onChange={(e) => setB(e.target.value)} min="0" max="255" className="form-range"/>
            <span>{b}</span>
          </label>
        </div>
        
        <button type="submit" className="btn btn-primary">Convert</button>
      </form>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Original Color</h2>
          <div className="d-flex justify-content-center">
            <div style={rgbStyle({ r, g, b })}></div>
          </div>
        </div>
      </div>
                   
            {colorSchemes && (
              <>
                <ColorSchemeDisplay title="Complementary Color" colors={colorSchemes.complementary} />
                <ColorSchemeDisplay title="Analogous Colors" colors={colorSchemes.analogous} />
                <ColorSchemeDisplay title="Split Complementary Colors" colors={colorSchemes.splitComplementary} />
                <ColorSchemeDisplay title="Triadic Colors" colors={colorSchemes.triadic} />
                <ColorSchemeDisplay title="Tetradic Colors" colors={colorSchemes.tetradic} />
                <ColorSchemeDisplay title="Monochromatic Colors" colors={colorSchemes.monochromatic} />
              </>
            )}
            
            {error && <div style={{ color: 'red', marginTop: '10px', width: '100%', textAlign: 'center' }}>{error}</div>}
          </div>
      );
    }

function ColorSchemeDisplay({ title, colors }) {
  const rgbStyle = (color) => ({
    backgroundColor: `rgb(${color?.r || 0},${color?.g || 0},${color?.b || 0})`,
    width: '100px',
    height: '100px',
    margin: '0 10px'
  });

  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9'
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="d-flex justify-content-center">
          {colors.map((color, index) => (
            <div key={index} style={rgbStyle(color)}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

