//devuelve los resultados numericos de los coeficientes
export function calcularCoeficientes(f, L, N)
{
    const a0 = (1/L) * integrar(f, -L, L); 
    const an = [];
    const bn = [];

    for(let n = 1; n <= N; n++)
    {
        const fnCos = (x) => f(x) * Math.cos((n * Math.PI * x)/L);
        const fnSin = (x) => f(x) * Math.sin((n * Math.PI * x)/L);

        const a_n = (1/L) * integrar(fnCos, -L, L);
        const b_n = (1/L) * integrar(fnSin, -L, L);

        an.push(a_n);
        bn.push(b_n);
    }

    return {a0,an,bn};
}
// integracion de una funcion f por medio del metodo del trapecio
export function integrar(f, a, b)
{
    const pasos = 5000;
    const h = (b - a) / pasos;

    let suma = f(a) + f(b);

    for(let i=1; i < pasos; i++)
    {
        const x = a + i * h;
        suma += 2 * f(x);
    }

    return (h / 2) * suma;
}
