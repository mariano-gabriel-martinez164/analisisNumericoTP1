export function generarSerieLatex(coef, L, N) {
  const terminos = [];

  const a0 = Number((coef.a0 / 2).toFixed(4));

  if (Math.abs(a0) > 0.0001) {
    terminos.push(
      `{\\color{#2563eb}{${a0}}}`
    );
  }
  const L_pi = L === Math.PI ? "\\pi" : L;

  for (let n = 1; n <= N; n++) {
    const an = Number(coef.an[n - 1].toFixed(4));
    const bn = Number(coef.bn[n - 1].toFixed(4));
    const sp = L === Math.PI;
    const arg = L_pi ? (n === 1 ? "x" : `${n}x`)
    : `\\frac{${n}\\pi x}{${sp}}`;

    if (Math.abs(an) > 0.0001) {
      terminos.push(
        `{\\color{#16a34a}{(${an})}}
        \\cos\\left(${arg}\\right)`
      );
    }

    if (Math.abs(bn) > 0.0001) {
      terminos.push(
        `{\\color{#dc2626}{(${bn})}}
        \\sin\\left(${arg}\\right)`
      );
    }
  }

  return `S_{${N}}(x) = ${terminos.join(" + ")}`;
}
