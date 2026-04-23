import { evaluate } from "mathjs";
import { useState } from "react";
import { generarDatos } from "./utils/fourier";
import { evaluarFuncion } from "./utils/fourier"
import { useMemo } from "react";
import Graph from "./utils/grafico";

function App() {
  const [resultado, setRE] = useState("");
  const [x, setx] = useState("");
  const [xmin, setXmin] = useState(-10);
  const [xmax, setXmax] = useState(10);

  // necesario para armar funciones a trozos
  const [piezas, setPiezas] = useState([
    { from: 0, to: 1, expr: "x",  includeFrom: true, includeTo: false }
  ]);

  let y = null; 
  try {
    if (x !== "") {
      y = evaluarFuncion(x, piezas);
    }
  } catch {}
  
  const datos = useMemo(() => {
    const xminNum = Number(xmin);
    const xmaxNum = Number(xmax);

    if(isNaN(xminNum) || isNaN(xmaxNum)) return [];

    return generarDatos(xmin, xmax, 1000, (x) => evaluarFuncion(x,piezas));
  }, [xmin, xmax, piezas]);

  const agregarPieza = () => {
    setPiezas(prev => [
      ...prev,
      { from: 0, to: 0, expr: "",  includeFrom: true, includeTo: false }
    ]);
  };
// --------------------


  const calcular = (e) => {
    e.preventDefault();
    const xnum = Number(x);

    if (isNaN(xnum)) {
      console.log("x inválido");
      return;
    }

    try {
      const resu = evaluarFuncion(xnum, piezas);
      setRE(resu);
    } catch(err){
      console.log("error en la funcion");
    }
  };

  //nos permite insertar simbolos predeterminados
  const insertarEnPieza = (index, texto) => {
    const copia = [...piezas];
    copia[index].expr = (copia[index].expr || "") + texto;
    setPiezas(copia);
  };

  const usarTodoElDominio = () => {
    setPiezas([
      {
        from: -Infinity,
        to: Infinity,
        expr: "",
        includeFrom: true,
        includeTo: true
      }
    ]);
  };

  return (
    <div className="contenedorMain">
      <h1>Series de Fourier - análisis numérico</h1>

      <form onSubmit={calcular}>
        <label>x = </label>
        <input value={x} onChange={(e) => setx(e.target.value)}/>
        {/* p seria tramo, i indice, si no, se editarian todos juntos desde un mismo input*/}
        {piezas.map((p, i) => (
          <div key={i}>
            <label>
              [
              <input
                type="checkbox"
                checked={p.includeFrom}
                onChange={(e) => {
                  const copia = [...piezas];
                  copia[i].includeFrom = e.target.checked;
                  setPiezas(copia);
                }}
              />
            </label>
            <input
              type="number"
              value={p.from}
              onChange={(e) => {
                const copia = [...piezas];
                copia[i].from = Number(e.target.value);
                setPiezas(copia);
              }}
            />
            <input
                type="number"
                value={p.to}
                onChange={(e) => {
                  const copia = [...piezas];
                  copia[i].to = Number(e.target.value);
                  setPiezas(copia);
                }}
              />
            <label>
              ]
              <input
                type="checkbox"
                checked={p.includeTo}
                onChange={(e) => {
                  const copia = [...piezas];
                  copia[i].includeTo = e.target.checked;
                  setPiezas(copia);
                }}
              />
            </label>

            <button type="button" onClick={usarTodoElDominio}>
              Usar (-∞, ∞)
            </button>

            <div>
              <button type="button" onClick={() => insertarEnPieza(i, "^")}>^</button>
              <button type="button" onClick={() => insertarEnPieza(i,"sqrt(")}>√</button>      
              <button type="button" onClick={() => insertarEnPieza(i,"sin(")}>sin</button>
              <button type="button" onClick={() => insertarEnPieza(i,"cos(")}>cos</button>
              <button type="button" onClick={() => insertarEnPieza(i,"pi")}>π</button>
              <button type="button" onClick={() => insertarEnPieza(i,"e")}>e</button>
              <button type="button" onClick={() => insertarEnPieza(i,"abs(")}>| |</button>
            </div>

              <input
                value={p.expr}
                onChange={(e) => {
                  const copia = [...piezas];
                  copia[i].expr = e.target.value;
                  setPiezas(copia);
                }}
              />
            </div>
          ))}
       

        <button type="button" onClick={agregarPieza}>
          Agregar tramo
        </button>
        <button type="submit">Calcular</button>
      </form>
      <p>Resultado: {resultado}</p>
      
      {/* mostramos estado */}
      {piezas.map((p, i) => (
        <div key={i}>
          {p.includeFrom ? "[" : "("}
          {p.from}, {p.to}
          {p.includeTo ? "]" : ")"} → {p.expr}
        </div>
      ))}
      <div>
        <label>xmin:</label>
        <input
          type="number"
          value={xmin}
          onChange={(e) => setXmin(e.target.value)}
        />

        <label>xmax:</label>
        <input
          type="number"
          value={xmax}
          onChange={(e) => setXmax(e.target.value)}
        />
      </div>
      <Graph data={datos} />
    </div>
  );
}

export default App;