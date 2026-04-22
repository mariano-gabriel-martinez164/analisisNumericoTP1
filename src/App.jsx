import { evaluate } from "mathjs";
import { useState } from "react";

function App() {
  const [resultado, setRE] = useState("");
  const [x, setx] = useState("");

  // necesario para armar funciones a trozos
  const [piezas, setPiezas] = useState([
    { from: 0, to: 1, expr: "x",  includeFrom: true, includeTo: false }
  ]);

  const agregarPieza = () => {
    setPiezas(prev => [
      ...prev,
      { from: 0, to: 0, expr: "",  includeFrom: true, includeTo: false }
    ]);
  };
// --------------------

// evaluar funcion primero encuentra el tramo de la pieza mediante el intervalo (from to)
//luego manda la expresion a evaluate, devolviendo imagen.
//esto es temporal, por ahora calculamos x luego pasamos a fourier
  const evaluarFuncion = (x) => {
    const tramo = piezas.find(p => {
      const left = p.includeFrom ? x >= p.from : x > p.from;
      const right = p.includeTo ? x <= p.to : x < p.to;
      return left && right;
    });

    if (!tramo) {
      throw new Error("x fuera de rango");
    }

    return evaluate(tramo.expr, { x });
  };

  const calcular = (e) => {
    e.preventDefault();
    const xnum = Number(x);

    if (isNaN(xnum)) {
      console.log("x inválido");
      return;
    }

    try {
      const resu = evaluarFuncion(xnum);
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

    </div>
  );
}

export default App;