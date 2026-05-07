import React, { useState, useMemo } from 'react';

// --- FUNCIONES MATEMÁTICAS ---

// Regla del trapecio para integración numérica
const integrate = (f, a, b, steps = 1000) => {
  let area = 0;
  const dx = (b - a) / steps;
  for (let i = 0; i < steps; i++) {
    const x0 = a + i * dx;
    const x1 = a + (i + 1) * dx;
    area += ((f(x0) + f(x1)) / 2) * dx;
  }
  return area;
};


const funcionOriginal = (t) => {
  const tMod = ((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  return tMod < Math.PI ? 1 : -1;
};

export default function CalculadoraFourier() {
  const [armonicos, setArmonicos] = useState(10);

  const T = 2 * Math.PI;
  const w0 = (2 * Math.PI) / T; 

 
  const coeficientes = useMemo(() => {
    const results = [];
    
   
    const a0 = (2 / T) * integrate((t) => funcionOriginal(t), 0, T);
    
   
    results.push({ n: 0, a: a0 / 2, b: 0 }); 


    for (let n = 1; n <= armonicos; n++) {
      const an = (2 / T) * integrate((t) => funcionOriginal(t) * Math.cos(n * w0 * t), 0, T);
      const bn = (2 / T) * integrate((t) => funcionOriginal(t) * Math.sin(n * w0 * t), 0, T);
      
     
      results.push({
        n,
        a: Math.abs(an) < 1e-10 ? 0 : an,
        b: Math.abs(bn) < 1e-10 ? 0 : bn
      });
    }
    return results;
  }, [armonicos, T, w0]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Serie de Fourier</h1>
      
      {/* CONTROL DE ARMÓNICOS (Cumple con el requisito de variar dinámicamente) */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="harmonic-slider">
          <strong>Cantidad de armónicos (N): {armonicos}</strong>
        </label>
        <br />
        <input
          id="harmonic-slider"
          type="range"
          min="1"
          max="50"
          value={armonicos}
          onChange={(e) => setArmonicos(Number(e.target.value))}
          style={{ width: '300px' }}
        />
      </div>

      {/* TABLA DE COEFICIENTES (Tu tarea principal) */}
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #2b2323ff' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead style={{ position: 'sticky', top: 0, background: '#070303ff' }}>
            <tr>
              <th style={{ padding: '10px', borderBottom: '2px solid #343333ff' }}>Armónico (n)</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #343333ff' }}>Coeficiente aₙ</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #343333ff' }}>Coeficiente bₙ</th>
            </tr>
          </thead>
          <tbody>
            {coeficientes.map((coef) => (
              <tr key={coef.n}>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{coef.n}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{coef.a.toFixed(4)}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{coef.b.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}