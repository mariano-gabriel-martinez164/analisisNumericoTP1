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

export default function FourierTable({ funcion }) {

  const [armonicos, setArmonicos] = useState(10);

  const T = 2 * Math.PI;
  const w0 = (2 * Math.PI) / T;

  // función protegida
  const safeFunction = (t) => {

    try {

      const val = funcion(t);

      // si da NaN o infinito devolvemos 0
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

      // a0
      const a0 = (2 / T) * integrate(
        (t) => safeFunction(t),
        0,
        T
      );

      results.push({
        n: 0,
        a: a0 / 2,
        b: 0
      });

      // an y bn
      for (let n = 1; n <= armonicos; n++) {

        const an = (2 / T) * integrate(
          (t) =>
            safeFunction(t) *
            Math.cos(n * w0 * t),
          0,
          T
        );

        const bn = (2 / T) * integrate(
          (t) =>
            safeFunction(t) *
            Math.sin(n * w0 * t),
          0,
          T
        );

        results.push({

          n,

          a:
            Math.abs(an) < 1e-10
              ? 0
              : an,

          b:
            Math.abs(bn) < 1e-10
              ? 0
              : bn
        });
      }

    } catch(err) {

      console.log(err);
    }

    return results;

  }, [armonicos, funcion]);

  return (

    <div style={{ marginTop: "30px" }}>

      <h2>Coeficientes de Fourier</h2>

      <div style={{ marginBottom: "20px" }}>

        <label>
          <strong>
            Cantidad de armónicos: {armonicos}
          </strong>
        </label>

        <br />

        <input
          type="range"
          min="1"
          max="50"
          value={armonicos}
          onChange={(e) =>
            setArmonicos(Number(e.target.value))
          }
          style={{ width: "300px" }}
        />
      </div>

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #2b2323ff"
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center"
          }}
        >

          <thead
            style={{
              position: "sticky",
              top: 0,
              background: "#070303ff"
            }}
          >

            <tr>
              <th>n</th>
              <th>aₙ</th>
              <th>bₙ</th>
            </tr>

          </thead>

          <tbody>

            {coeficientes.map((coef) => (

              <tr key={coef.n}>

                <td
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #ddd"
                  }}
                >
                  {coef.n}
                </td>

                <td
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #ddd"
                  }}
                >
                  {coef.a.toFixed(4)}
                </td>

                <td
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #ddd"
                  }}
                >
                  {coef.b.toFixed(4)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}