import React, { useState, useMemo } from "react";

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

export default function FourierTable({ funcion, onArmonicosChange }) {
  const [armonicos, setArmonicos] = useState(10);

  const T = 2 * Math.PI;
  const w0 = (2 * Math.PI) / T;

  const safeFunction = (t) => {
    try {
      const val = funcion(t);
      if (isNaN(val) || !isFinite(val)) {
        return 0;
      }
      return val;
    } catch {
      return 0;
    }
  };

  const coeficientes = useMemo(() => {
    const results = [];

    try {
      const a0 = (2 / T) * integrate(
        (t) => safeFunction(t),
        0,
        T
      );

      results.push({
        n: 0,
        a: a0 / 2,
        b: 0,
        isA0: true
      });

      for (let n = 1; n <= armonicos; n++) {
        const an = (2 / T) * integrate(
          (t) => safeFunction(t) * Math.cos(n * w0 * t),
          0,
          T
        );

        const bn = (2 / T) * integrate(
          (t) => safeFunction(t) * Math.sin(n * w0 * t),
          0,
          T
        );

        results.push({
          n,
          a: Math.abs(an) < 1e-10 ? 0 : an,
          b: Math.abs(bn) < 1e-10 ? 0 : bn,
          isA0: false
        });
      }
    } catch (err) {
      console.log(err);
    }

    return results;
  }, [armonicos, funcion]);

  const handleArmonicosChange = (value) => {
    setArmonicos(value);
    if (onArmonicosChange) {
      onArmonicosChange(value);
    }
  };

  return (
    <div className="coefficientsContainer">
      <h2>📊 Coeficientes de Fourier</h2>

      <div className="sliderContainer">
        <div className="sliderLabel">
          <strong>Cantidad de armónicos</strong>
          <span className="sliderValue">{armonicos}</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={armonicos}
          onChange={(e) => handleArmonicosChange(Number(e.target.value))}
        />
      </div>

      <div style={{ marginTop: "1rem", overflowX: "auto" }}>
        <table className="coefficientsTable">
          <thead>
            <tr>
              <th>Armónico (n)</th>
              <th style={{ color: '#93C5FD' }}>aₙ (coseno)</th>
              <th style={{ color: '#FDBA74' }}>bₙ (seno)</th>
            </tr>
          </thead>
          <tbody>
            {coeficientes.map((coef) => (
              <tr
                key={coef.n}
                className={coef.isA0 ? "coeffRow-a0" : ""}
                style={{
                  backgroundColor: coef.isA0
                    ? "rgba(147, 197, 253, 0.15)"
                    : "transparent"
                }}
              >
                <td style={{ fontWeight: coef.isA0 ? "700" : "600" }}>
                  {coef.isA0 ? "a₀/2" : `${coef.n}`}
                </td>
                <td className="coeffCol-an">
                  {coef.a.toFixed(6)}
                </td>
                <td className="coeffCol-bn">
                  {coef.b.toFixed(6)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="statsContainer">
        <div className="statCard">
          <div className="statLabel">Total de armónicos</div>
          <div className="statValue">{armonicos}</div>
        </div>
        <div className="statCard">
          <div className="statLabel">Período (T)</div>
          <div className="statValue">{(2 * Math.PI).toFixed(2)}</div>
        </div>
        <div className="statCard">
          <div className="statLabel">Frecuencia base (ω₀)</div>
          <div className="statValue">{w0.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
