export function generarSerieTexto(coef, L, N, epsilon = 1e-3) {
  const esCero = (v) => Math.abs(v) < epsilon;
  const fmt = (v) => Math.abs(v).toFixed(4);

  // Detectar si L ≈ π
  const Lstr = Math.abs(L - Math.PI) < 1e-6 ? "π" : L.toFixed(3);

  let partes = [];

  // a0/2
  const a0 = coef.a0 / 2;
  if (!esCero(a0)) {
    partes.push(a0.toFixed(4));
  }

  for (let n = 1; n <= N; n++) {
    const a = coef.an[n - 1];
    const b = coef.bn[n - 1];

    if (!esCero(a)) {
      partes.push(
        `${a >= 0 ? "+" : "-"} ${fmt(a)} cos(${n}πx/${Lstr})`
      );
    }

    if (!esCero(b)) {
      partes.push(
        `${b >= 0 ? "+" : "-"} ${fmt(b)} sin(${n}πx/${Lstr})`
      );
    }
  }

  // limpiar primer signo "+"
  let serie = partes.join(" ");
  serie = serie.replace(/^\+\s/, "");

  return `S_${N}(x) = ${serie}`;
}