import "./App.css";
import SerieFourier from "./utils/fourier/comfinal";
import { calcularCoeficientes } from "./utils/fourier/coeficientes";
import DirichletTable from "./utils/fourier/Dirich";
import { useState, useMemo } from "react";
import { generarDatos, evaluarFuncion } from "./utils/fourier";
import Graph from "./utils/grafico";
import FourierTable from "./FourierTable.jsx";

export default function App() {
  const [coef, setCoef] = useState(null);
  // necesario para armar funciones a trozos
  const [piezas, setPiezas] = useState([
    { from: -10, to: 10, expr: "x",  includeFrom: true, includeTo: false,  error: ""}
  ]);


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
  
  const datos = useMemo(() => {
    const xminNum = Number(xmin);
    const xmaxNum = Number(xmax);

    if(isNaN(xminNum) || isNaN(xmaxNum)) return [];

    return generarDatos(xmin, xmax, 1000, (x) => evaluarFuncion(x,piezas));
  }, [xmin, xmax, piezas]);

  const agregarPieza = () => {
    setPiezas(prev => [
      ...prev,
      { from: 0, to: 0, expr: "",  includeFrom: true, includeTo: false, error: ""}
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
      setRE("x fuera del dominio");
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
        from: -1000,
        to: 1000,
        expr: "x",
        includeFrom: true,
        includeTo: true
      }
    ]);
  };

  return (
    <div className="contenedorMain">
      <h1>Series de Fourier - análisis numérico</h1>
      <form onSubmit={calcular}>
        <div className="campo">
          <label>Valor de x: </label>
          <input 
            type="number"
            placeholder="Ej: 2"
            value={x}
            onChange={(e) => setx(e.target.value)}
        />
        </div>
        
        {/* p seria tramo, i indice, si no, se editarian todos juntos desde un mismo input*/}
        {piezas.map((p, i) => (
          <div key={i} className="tramoBox">
            <div className="campo">
              <label>Valores del intervalo</label>
              <div className="intervaloRow">
                 <div className="checkboxGrupo">
                  <input
                  type="checkbox"
                  checked={p.includeFrom}
                  onChange={(e) => {
                  const copia = [...piezas];
                  copia[i].includeFrom = e.target.checked;
                  setPiezas(copia);
                  }}
                  />
                  <span>Incluye inicio</span>
                </div>
                 <input
                  type="number"
                  placeholder="Inicio"
                  value={p.from}
                  onChange={(e) => {
                  const copia = [...piezas];
                  copia[i].from = Number(e.target.value);
                  setPiezas(copia);
                  }}
                  />
                  <input
                  type="number"
                  placeholder="Fin"
                  value={p.to}
                  onChange={(e) => {
                  const copia = [...piezas];
                  copia[i].to = Number(e.target.value);
                  setPiezas(copia);
                  }}
                  />

                  <div className="checkboxGrupo">
                    <input
                      type="checkbox"
                      checked={p.includeTo}
                      onChange={(e) => {
                        const copia = [...piezas];
                        copia[i].includeTo = e.target.checked;
                        setPiezas(copia);
                      }}
                    />
                    <span>Incluye fin</span>
                  </div>
              </div>
            </div>

            <button type="button" onClick={usarTodoElDominio}>
              Usar (-∞, ∞)
            </button>

            <div className="botonesMath">
              <button type="button" onClick={() => insertarEnPieza(i, "^")}>^</button>
              <button type="button" onClick={() => insertarEnPieza(i,"sqrt(")}>√</button>      
              <button type="button" onClick={() => insertarEnPieza(i,"sin(")}>sin</button>
              <button type="button" onClick={() => insertarEnPieza(i,"cos(")}>cos</button>
              <button type="button" onClick={() => insertarEnPieza(i,"pi")}>π</button>
              <button type="button" onClick={() => insertarEnPieza(i,"e")}>e</button>
              <button type="button" onClick={() => insertarEnPieza(i,"abs(")}>| |</button>
            </div>
            <div className="campo">
                <label >Expresión matemática: </label>
                <input
                  placeholder="Ej: x^2, sin(x), abs(x)"
                  value={p.expr}
                  onChange={(e) => {
                    const copia = [...piezas];

                    copia[i].expr = e.target.value;

                    try {
                      evaluarFuncion(1, [
                        {
                          ...copia[i],
                          expr: e.target.value
                        }
                      ]);

                      copia[i].error = "";

                    } catch {
                      copia[i].error = "Expresión inválida";
                    }

                    setPiezas(copia);
                  }}
                />
                {p.error && (
                  <span className="errorTexto">
                    {p.error}
                  </span>
                )}
            </div>
          </div>
          ))}
        <button type="button" onClick={agregarPieza}>
          Agregar tramo
        </button>
        <button type="submit">
          Calcular
        </button> 
      </form>
      <div className="resultadoBox">
        <span className="resultadoTitulo">Resultado</span>
        <span className="resultadoValor">{resultado !== "" ? resultado : "-"}</span>
      </div>
      <div className="funcionesActuales">
        <h3>Funciones definidas</h3>

        {piezas.map((p, i) => (
          <div key={i} className="funcionItem">

            {p.includeFrom ? "[" : "("}
            {p.from}, {p.to}
            {p.includeTo ? "]" : ")"}

            {" → "}

            {p.expr}

          </div>
        ))}
      </div>
      <div className="tramoBox">

        <label>Rango del gráfico</label>

        <div className="intervaloRow">

          <div className="campo">
            <label>xmin</label>

            <input
            type="number"
            value={xmin}
            onChange={(e) => setXmin(e.target.value)}
            />
          </div>

        <div className="campo">
          <label>xmax</label>

          <input
            type="number"
            value={xmax}
            onChange={(e) => setXmax(e.target.value)}
          />
        </div>

        </div>
      </div>
      <Graph data={datos} />
      <FourierTable funcion={(t) => evaluarFuncion(t, piezas)}/>
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
    </div>
  );
}

export default App;

