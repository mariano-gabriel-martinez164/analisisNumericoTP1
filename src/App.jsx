import { useState } from "react";
import "./App.css";
import SerieFourier from "./utils/fourier/comfinal";
import { calcularCoeficientes } from "./utils/fourier/coeficientes";
import DirichletTable from "./utils/fourier/Dirich";


export default function App() {
  const [coef, setCoef] = useState(null);

  const f = (x) => x; // ejemplo
  const L = Math.PI;
  const [N, setN] = useState(10);

  const incrementarN = () => {
    const nuevoN = N + 1;

    setN(nuevoN);

    const resultado = calcularCoeficientes(f, L, nuevoN);
    setCoef(resultado);
  };

  const calcular = () => {
    const resultado = calcularCoeficientes(f, L, N);
    setCoef(resultado);
  };
  
  return (
    <div>
      <button className="btn-n" onClick={calcular}>
        Generar serie
      </button>

      <button
        className="btn-extra"
        onClick={incrementarN}>
        Incrementar N = {N}
      </button>

      {coef && (
        <SerieFourier coef={coef} L={L} N={N} />
      )}
      <DirichletTable f={f} puntos={[0, 1, 1.5, 2]}/>
    </div>
  );
}
