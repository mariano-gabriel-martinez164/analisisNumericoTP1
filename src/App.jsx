import "./App.css";
import SerieFourier from "./utils/fourier/comfinal";
import { calcularCoeficientes } from "./utils/fourier/coeficientes";
import DirichletTable from "./utils/fourier/Dirich";
import { useState, useMemo } from "react";
import { generarDatos, evaluarFuncion } from "./utils/fourier";
import Graph from "./utils/grafico";
import FourierTable from "./FourierTable.jsx";
import { generarDatosComparacion, calcularErrorMaximo, calcularErrorPromedio } from "./utils/fourierUtils";

export default function App() {
  const [resultado, setRE] = useState("");
  const [x, setx] = useState("");
  const [xmin, setXmin] = useState(-10);
  const [xmax, setXmax] = useState(10);
  const [coef, setCoef] = useState(null);
  const [piezas, setPiezas] = useState([
    { from: -10, to: 10, expr: "x", includeFrom: true, includeTo: false, error: "" }
  ]);

  const L = Math.PI;
  const [N, setN] = useState(10);
  const [expandirFunciones, setExpandirFunciones] = useState(false);

  const incrementarN = () => {
    const nuevoN = N + 1;
    setN(nuevoN);
    const resultado = calcularCoeficientes((x) => evaluarFuncion(x, piezas), L, nuevoN);
    setCoef(resultado);
  };

  const decrementarN = () => {
    if (N > 1) {
      const nuevoN = N - 1;
      setN(nuevoN);
      const resultado = calcularCoeficientes((x) => evaluarFuncion(x, piezas), L, nuevoN);
      setCoef(resultado);
    }
  };

  const calcularSerieAlg = () => {
    const resultado = calcularCoeficientes((x) => evaluarFuncion(x, piezas), L, N);
    setCoef(resultado);
  };

  const datos = useMemo(() => {
    const xminNum = Number(xmin);
    const xmaxNum = Number(xmax);
    if (isNaN(xminNum) || isNaN(xmaxNum)) return [];
    return generarDatos(xminNum, xmaxNum, 1000, (x) => evaluarFuncion(x, piezas));
  }, [xmin, xmax, piezas]);

  const datosComparacion = useMemo(() => {
    const xminNum = Number(xmin);
    const xmaxNum = Number(xmax);
    if (isNaN(xminNum) || isNaN(xmaxNum) || !coef) return [];
    return generarDatosComparacion(xminNum, xmaxNum, 1000, (x) => evaluarFuncion(x, piezas), coef, L);
  }, [xmin, xmax, piezas, coef]);

  const errorMax = useMemo(() => calcularErrorMaximo(datosComparacion), [datosComparacion]);
  const errorPromedio = useMemo(() => calcularErrorPromedio(datosComparacion), [datosComparacion]);
  const convergencia = Math.max(0, Math.min(100, 100 - errorMax * 10));

  const agregarPieza = () => {
    setPiezas(prev => [
      ...prev,
      { from: 0, to: 0, expr: "", includeFrom: true, includeTo: false, error: "" }
    ]);
  };

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
    } catch (err) {
      setRE("x fuera del dominio");
    }
  };

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

  const resetearSeries = () => {
    setPiezas([
      { from: -10, to: 10, expr: "x", includeFrom: true, includeTo: false, error: "" }
    ]);
    setCoef(null);
    setRE("");
    setx("");
    setN(10);
  };

  return (
    <div className="contenedorMain">
      <h1>⚡ Series de Fourier - Análisis Numérico</h1>

      <div className="toolbarTop">
        <button className="btn-reset" onClick={resetearSeries} title="Limpiar todas las series y empezar de nuevo">
          🔄 Limpiar Series
        </button>
      </div>

      <div className="mainLayout">
        {/* COLUMNA IZQUIERDA - CONTROLES */}
        <div className="controlPanel">
          
          {/* DEFINICIÓN DE FUNCIÓN */}
          <section>
            <div
              className="accordionHeader"
              onClick={() => setExpandirFunciones(!expandirFunciones)}
            >
              <span>Definir Función</span>
              <span>{expandirFunciones ? "▼" : "▶"}</span>
            </div>
            <div
              className={`accordionContent ${expandirFunciones ? "open" : ""}`}
              style={{
                maxHeight: expandirFunciones ? "600px" : "0",
              }}
            >
              <div className="accordionBody">
                <form onSubmit={calcular}>
                  {piezas.map((p, i) => (
                    <div key={i} className="tramoBox">
                      <div className="campo">
                        <label>Intervalo #{i + 1}</label>
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
                            <span>[ Inicio</span>
                          </div>
                          <input
                            type="number"
                            placeholder="Min"
                            value={p.from}
                            onChange={(e) => {
                              const copia = [...piezas];
                              copia[i].from = Number(e.target.value);
                              setPiezas(copia);
                            }}
                          />
                          <input
                            type="number"
                            placeholder="Max"
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
                            <span>Fin ]</span>
                          </div>
                        </div>
                      </div>

                      <div className="botonesMath">
                        <button type="button" className="btn-small" onClick={() => insertarEnPieza(i, "^")}>
                          ^
                        </button>
                        <button type="button" className="btn-small" onClick={() => insertarEnPieza(i, "sqrt(")}>
                          √
                        </button>
                        <button type="button" className="btn-small" onClick={() => insertarEnPieza(i, "sin(")}>
                          sin
                        </button>
                        <button type="button" className="btn-small" onClick={() => insertarEnPieza(i, "cos(")}>
                          cos
                        </button>
                        <button type="button" className="btn-small" onClick={() => insertarEnPieza(i, "pi")}>
                          π
                        </button>
                        <button type="button" className="btn-small" onClick={() => insertarEnPieza(i, "e")}>
                          e
                        </button>
                        <button type="button" className="btn-small" onClick={() => insertarEnPieza(i, "abs(")}>
                          |x|
                        </button>
                      </div>

                      <div className="campo">
                        <label>Expresión f(x)</label>
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
                            ✗ {p.error}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="buttonGroup">
                    <button type="button" className="btn-extra btn-small" onClick={agregarPieza}>
                      + Agregar intervalo
                    </button>
                    <button type="button" className="btn-extra btn-small" onClick={usarTodoElDominio}>
                      Dominio ℝ
                    </button>
                  </div>

                  <div className="campo">
                    <label>Evaluar en x</label>
                    <input
                      type="number"
                      placeholder="Valor de x"
                      value={x}
                      onChange={(e) => setx(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-generar" style={{ marginBottom: "1rem", width: "100%" }}>
                    Calcular
                  </button>

                  {resultado !== "" && (
                    <div className="resultadoBox">
                      <span className="resultadoTitulo">Resultado</span>
                      <span className="resultadoValor">{resultado}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </section>

          {/* RANGO GRÁFICO */}
          <div>
            <div className="sectionHeader">Rango del Gráfico</div>
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

          {/* CONTROLES DE SERIE */}
          <div>
            <div className="sectionHeader">Serie de Fourier</div>
            <div className="sliderContainer">
              <div className="sliderLabel">
                <strong>Número de armónicos (N)</strong>
                <span className="sliderValue">{N}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={N}
                onChange={(e) => setN(Number(e.target.value))}
              />
            </div>

            <div className="buttonGroup full">
              <button className="btn-generar" onClick={calcularSerieAlg}>
                🎯 Generar Serie (N={N})
              </button>
            </div>
          </div>

          {/* INDICADOR DE CONVERGENCIA */}
          {coef && datosComparacion.length > 0 && (
            <div className="convergenceIndicator">
              <div className="convergenceLabel">Convergencia</div>
              <div className="convergenceBar">
                <div
                  className="convergenceFill"
                  style={{ width: `${convergencia}%` }}
                />
              </div>
              <div style={{ fontSize: "0.85rem", marginTop: "0.5rem", color: "var(--text-secondary)" }}>
                Error máx: {errorMax.toFixed(4)} | Error RMS: {errorPromedio.toFixed(4)}
              </div>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA - VISUALIZACIÓN */}
        <div className="visualPanel">
          
          {/* GRÁFICOS */}
          <div className="graphicsContainer">
            <div style={{ marginBottom: "0.5rem" }}>
              <div className="sectionHeader" style={{ marginBottom: "1rem" }}>
                📈 Gráficos Comparativos
              </div>
              {coef && (
                <div className="legend">
                  <div className="legendItem">
                    <div className="legendColor colorOriginal"></div>
                    <span>Función Original</span>
                  </div>
                  <div className="legendItem">
                    <div className="legendColor colorFourier"></div>
                    <span>Serie de Fourier</span>
                  </div>
                </div>
              )}
            </div>
            <Graph data={datos} dataComparison={coef ? datosComparacion : null} />
          </div>

          {/* TABLA DE COEFICIENTES */}
          <FourierTable funcion={(t) => evaluarFuncion(t, piezas)} />

          {/* DIRICHLET */}
          <div className="dirichletContainer">
            <h2>🔍 Convergencia de Dirichlet</h2>
            <DirichletTable f={(x) => evaluarFuncion(x, piezas)} puntos={[0, 1, 1.5, 2]} />
          </div>

          {/* SERIE */}
          {coef && (
            <div className="serieContainer">
              <h3 style={{ color: "var(--pastel-green)", marginTop: 0 }}>Representación Matemática</h3>
              <SerieFourier coef={coef} L={L} N={N} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



