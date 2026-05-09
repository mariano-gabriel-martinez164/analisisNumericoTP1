import { evaluate } from "mathjs";

export const evaluarFuncion = (x, piezas) => {
    const tramo = piezas.find(p => {
        const left = p.includeFrom ? x >= p.from : x > p.from;
        const right = p.includeTo ? x <= p.to : x < p.to;
        return left && right;
    });

    if (!tramo) {
        return NaN;
    }

    try {
        return evaluate(tramo.expr, { x });
    } catch {
        return NaN;
    }
};



export const generarDatos = (xmin, xmax, pasos, evaluar) => {
  const datos = [];
  const dx = (xmax - xmin) / pasos;

  for (let i = 0; i <= pasos; i++) {
    const x = xmin + i * dx;

    try {
      const y = evaluar(x);
      datos.push({ x, y });
    } catch {}
  }

  return datos;
};